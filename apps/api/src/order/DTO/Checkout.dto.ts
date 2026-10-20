import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CheckOutItemDto } from './CheckoutItem.dto';

export class CheckOutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => CheckOutItemDto)
  items!: CheckOutItemDto[];

  @IsString()
  @IsNotEmpty()
  shippingAddressId!: string
}
