import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { CheckOutDto } from './DTO/Checkout.dto';

@Controller('order')
export class OrderController {
  @Post()
  checkOut(
    @Body() checkoutDto: CheckOutDto,
    @Headers('Idempotency-key') idempotencyKey?: string,
  ) {
    if (!idempotencyKey?.trim()) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'IDEMPOTENCY_KEY_REQUIRED',
        message: 'Idempotency-Key header is required',
      });
    }
    return { message: 'Idempotency key validated successfully' };
  }
}
