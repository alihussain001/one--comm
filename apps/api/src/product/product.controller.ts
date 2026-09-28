import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './DTO/productResponseDto';
import { CreateProductDto } from './DTO/createProductDto';

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
    
}
