import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CheckOutItemDto{
    @IsString()
    @IsNotEmpty()
    productId!: string

    @IsInt()
    @Min(1)
    @Max(10)
    quantity!: number
}