import { IsBoolean, IsNumber, IsNumberString, IsString } from "class-validator";

export class ProductResponseDto{
    id?: number;
    name?: string;
    price?: string;
    stock?:number;

}