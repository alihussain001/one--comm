import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { CheckOutDto } from './DTO/Checkout.dto';

@Controller('orders')
export class OrderController {

  @Post('checkout')
  async checkOut(@Body() body: CheckOutDto) {
    return {
      message: 'DTO validation successfull',
      data: body
    };
  }
}
