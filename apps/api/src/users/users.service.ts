import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor( private readonly prismaService: PrismaService){}
   async createUser( data: Prisma.UserCreateInput): Promise<User>{
    return this.prismaService.user.create({
        data,
    })
    }
}
