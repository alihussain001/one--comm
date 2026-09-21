import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product does not exist');
    }
    return product;
  }

   getAllProducts() {
    return this.prismaService.product.findMany();
  }
}
