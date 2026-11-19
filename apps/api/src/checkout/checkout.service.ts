import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/browser';
import { CheckOutItemDto } from './DTO/CheckoutItem.dto';
import { CheckOutDto } from './DTO/Checkout.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class CheckoutService {
  constructor(private readonly prismaService: PrismaService) {}

  async decrementStockItems(
    tx: Prisma.TransactionClient,
    productId: number,
    quantity: number,
  ): Promise<void> {
    const result = await tx.product.updateMany({
      where: {
        id: productId,
        stock: { gte: quantity },
      },
      data: {
        stock: { decrement: quantity },
      },
    });

    if (result.count === 0) {
      throw new ConflictException(
        `Insufficient stock for product ${productId}`,
      );
    }
  }

  async processStockItems(
    tx: Prisma.TransactionClient,
    items: CheckOutItemDto[],
  ): Promise<void> {
    const sortedItems = [...items].sort((a, b) => a.productId - b.productId);

    for (const item of sortedItems) {
      await this.decrementStockItems(tx, item.productId, item.quantity);
    }
  }

  //   check-out
  async checkOut(dto: CheckOutDto, userId: number) {
    return this.prismaService.$transaction(async (tx) => {
      // address validation
      const address = await tx.address.findFirst({
        where: {
          id: dto.shippingAddressId,
          userId,
          isDeleted: false,
        },
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      
      // product validaton
      const product = await tx.product.findMany({
          where: {
              id: { in: dto.items.map((item) => item.productId) },
              isActive: true,
            },
            select: {
                id: true,
                name: true,
                stock: true,
                price: true,
            },
        });
        
        const productIds = dto.items.map((item) => item.productId);
        const uniqueProductId = new Set(productIds);
        
        if (uniqueProductId.size !== dto.items.length) {
          throw new BadRequestException('Duplicate product IDs are not allowed');
        }
        // for duplicate product ids
  
        // for Missing and inactive products
        if (uniqueProductId.size !== product.length) {
          throw new NotFoundException('One or more product were not found');
        }
        
        
        // chech-out total
        let totalAmount = new Prisma.Decimal(0);

        // order-items
        const orderItems: Prisma.OrderItemUncheckedCreateWithoutOrderInput[] = [];
        for(const item of dto.items){
            const currentProduct = product.find((p) => p.id === item.productId);

            if(!currentProduct){
                throw new NotFoundException(`Product ${item.productId} not found`);
            }

        if(item.quantity > currentProduct.stock){
            throw new ConflictException(`Insufficient stock for ${currentProduct.name}` );
        }



        const subtotal = currentProduct.price.mul(item.quantity);

        totalAmount = totalAmount.plus(subtotal);



        orderItems.push({
          productId: currentProduct.id,
          productName: currentProduct.name,
          quantity: item.quantity,
          unitPrice:   currentProduct.price
        });
        }

        // atomic decrement stock 
        await this.processStockItems(tx, dto.items);

        // unique order number generate
        const orderNumber = await this.generateOrderNumber(tx);

        // Create Order with nested order items 
        const order = await tx.order.create({
          data:{
            orderNumber,
            userId,
            paymentMethod: dto.paymentMethod,
            totalAmount,
            addressId: address.id,
            orderItems:{
              create: orderItems,
            },
          },
          include:{
              orderItems: true,
          },
        });

        return order;

    });
  }

  async generateOrderNumber(tx: Prisma.TransactionClient):Promise<string>{
    const date = new Date().toISOString().slice(0,10).replace(/-/g, '');

    let orderNumber: string;
    let exists: {id: number} | null;

    do {
      const suffix = randomBytes(3).toString('hex').toUpperCase();
      orderNumber = `ORD-${date}-${suffix}`;

      exists = await tx.order.findUnique({
        where: { orderNumber },
        select: { id: true },
      });
    } while (exists);

    return orderNumber;
  }
}

