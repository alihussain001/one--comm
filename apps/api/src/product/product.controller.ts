import { Product } from './../../dist/generated/prisma/client.d';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './DTO/productResponseDto';
import { CreateProductDto } from './DTO/createProductDto';
import { UpdateProductDto } from './DTO/updateProductDto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number, Param: ProductResponseDto){
        return this.productService.findProductById(id)
    }

    @Get()
    async getAllProducts(){
        return this.productService.getAllProducts();
    }

    @Post()
    async createProduct(@Body() body: CreateProductDto){
        return this.productService.createProduct(body);
    }
    
    @Patch(':id')
    async updateProduct(@Param('id', ParseIntPipe) id:number, @Body() body:UpdateProductDto){
        return this.productService.updateProduct({
            where: {id},
            data: body
        })
    }
}
