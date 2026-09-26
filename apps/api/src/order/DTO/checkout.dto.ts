import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CheckOutDto{
    @IsInt()
    @IsPositive()
    productId!: number

    @IsInt()
    @IsPositive()
    quantity!: number
}