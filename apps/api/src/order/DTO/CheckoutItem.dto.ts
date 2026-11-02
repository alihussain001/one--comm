import { IsInt, IsNotEmpty, IsPositive, Max, Min } from "class-validator";

export class CheckOutItemDto{
    @IsInt()
    @IsPositive()
    productId!: number

    @IsInt()
    @Min(1)
    @Max(10)
    quantity!: number
}