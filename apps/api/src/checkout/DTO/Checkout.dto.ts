import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CheckOutItemDto } from './CheckoutItem.dto';

export enum PaymentMethod{
  COD='COD',
}

export class CheckOutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => CheckOutItemDto)
  items!: CheckOutItemDto[];

  @IsInt()
  @IsNotEmpty()
  shippingAddressId!: number;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod

  @IsString()
  @IsOptional()
  @MaxLength(500, {message: "Note can not exceed 500 characters."})
  notes?: string

}
