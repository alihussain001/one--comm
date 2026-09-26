import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from './DTO/productResponseDto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProductById(id: number): Promise<ProductResponseDto> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product does not exist');
    }
    return{
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock,
    }

    
  }

  async getAllProducts(): Promise<ProductResponseDto[]>{
    const products = await this.prismaService.product.findMany();

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock,
    }))
  }
}
