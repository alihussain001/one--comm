import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number){
        return this.productService.findProductById(id)
    }

    @Get()
    async getAllProducts(){
        return this.productService.getAllProducts();
    }
}
