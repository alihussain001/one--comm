import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/browser';
import { CheckOutItemDto } from './DTO/CheckoutItem.dto';

@Injectable()
export class CheckoutService {
    constructor(private readonly prismaService: PrismaService){}


    async decrementStockItems(tx: Prisma.TransactionClient ,productId: number, quantity: number):Promise<void>{
        const result = await tx.product.updateMany({
            where:{
                id: productId,
                stock: {gte: quantity}
            },
            data:{
                stock: {decrement: quantity}
            }
        })

        if(result.count === 0){
            throw new ConflictException(`Insufficient stock for product ${productId}`);
        };
    };

    async processStockItems(tx: Prisma.TransactionClient, items:CheckOutItemDto[]):Promise<void>{
        const sortedItems= [...items].sort((a,b) => a.productId - b.productId);


        for (const item of sortedItems) {
            await this.decrementStockItems(tx, item.productId, item.quantity);
        }
    }

}
