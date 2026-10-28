import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './DTO/create-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { identity } from 'rxjs';
import { create } from 'domain';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAddress(createAddressDto: CreateAddressDto, authUserId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        authUserId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prismaService.$transaction(async(tx) =>{
        if(createAddressDto.isDefault === true){
            await tx.address.updateMany({
                where:{
                    userId: user.id,
                    isDefault:true
                },
                data:{
                    isDefault: false
                },
            });
        };
        return tx.address.create({
            data:{
                line1: createAddressDto.line1,
                line2: createAddressDto.line2,
                state: createAddressDto.state,
                city: createAddressDto.city,
                postalCode:createAddressDto.postalCode,
                phone: createAddressDto.phone,
                isDefault: createAddressDto.isDefault,
                userId: user.id
            }
        })
    })
  }
}
