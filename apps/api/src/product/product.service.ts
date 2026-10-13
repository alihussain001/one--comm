import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { ProductResponseDto } from './DTO/productResponseDto';
import { CreateProductDto } from './DTO/createProductDto';
import { UpdateProductDto } from './DTO/updateProductDto';
import { Prisma } from 'generated/prisma/client';
import { error } from 'node:console';

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
      isActive: product.isActive
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

  async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
    const newProduct = await this.prismaService.product.create({ data });
    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price.toString(),
      stock: newProduct.stock,
    };
  }

  async updateProduct(
    id: number,
    data: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    try {
      const updateProduct = await this.prismaService.product.update({
        where: { id },
        data,
      });
      return {
        id: updateProduct.id,
        name: updateProduct.name,
        price: updateProduct.price.toString(),
        stock: updateProduct.stock,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Product not found!');
        }
      }

      throw error;
    }
  }

  async deactivateProduct(id: number): Promise<ProductResponseDto> {
    try {
      const deactivatedProduct = await this.prismaService.product.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      });
      return {
        id: deactivatedProduct.id,
        name: deactivatedProduct.name,
        price: deactivatedProduct.price.toString(),
        stock: deactivatedProduct.stock,
        isActive: deactivatedProduct.isActive,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Product not found!');
        }
      }

      throw error;
    }
  }
}
