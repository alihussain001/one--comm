import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckOutDto } from './DTO/checkout.dto';

@Injectable()
export class OrderService {
    constructor(private readonly prismaService : PrismaService){}
    
   
}
