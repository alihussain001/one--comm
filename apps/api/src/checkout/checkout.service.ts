import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/browser';
import { CheckOutItemDto } from './DTO/CheckoutItem.dto';
import { CheckOutDto } from './DTO/Checkout.dto';

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
        

        for(const item of dto.items){
            const currentProduct = product.find((p) => p.id === item.productId);

            if(!currentProduct){
                throw new NotFoundException(`Product ${item.productId} not found`);
            }

        if(item.quantity > currentProduct.stock){
            throw new ConflictException(`Insufficient stock for ${currentProduct.name}` )
        }
        }

    //     for (const item of dto.items) {
    //     const currentProduct = product.find((p) => p.id === item.productId);

    //     if (!currentProduct) {
    //       throw new NotFoundException(`Product ${item.productId} not found`);
    //     }

    //     if (item.quantity > currentProduct.stock) {
    //       throw new ConflictException(
    //         `Insufficient stock for ${currentProduct.name}`,
    //       );
    //     }
    //   }
    });
  }
}
