import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProductById(id: number){
    const product = await this.prismaService.product.findUnique({
        where:{
            id
        }
    });
    if(!product){
        throw new NotFoundException('Product does not exist')
    }
    return product;
}
  }
