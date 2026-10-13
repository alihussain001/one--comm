import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './DTO/productResponseDto';
import { CreateProductDto } from './DTO/createProductDto';
import { UpdateProductDto } from './DTO/updateProductDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number, param: ProductResponseDto
  ) {
    return this.productService.findProductById(id);
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, body);
  }

  @Patch(':id/deactivate')
  async deactivateProduct(@Param('id', ParseIntPipe) id: number){
    return this.productService.deactivateProduct(id);
  }
}
