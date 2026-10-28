import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  line1!: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid E.164 format (e.g., +923001234567)',
  })
  phone!: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
