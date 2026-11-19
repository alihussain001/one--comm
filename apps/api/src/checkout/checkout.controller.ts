import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckOutDto } from './DTO/Checkout.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService){}

    @UseGuards(AuthGuard)
    @Post()
    async createOrder(@Body() body:CheckOutDto, @Req() req:any){
        return this.checkoutService.checkOut(body, req.user.id);
    }
}
