import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from './DTO/productResponseDto';
import { CreateProductDto } from './DTO/createProductDto';

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
    return {
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock,
    };
  }

  async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.prismaService.product.findMany();

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock,
    }));
  }

  async createProduct(data: CreateProductDto): Promise<ProductResponseDto>{
    const newProduct = await this.prismaService.product.create({ data });
    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price.toString(),
      stock: newProduct.stock,
    };
  }
}
