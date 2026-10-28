import { Body, Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './DTO/create-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService){}

    @UseGuards(AuthGuard)
    @Post()
    createAddress(@Body() body: CreateAddressDto, @Req() req: any){
        const authUserId: string = req.user.id;

        return this.addressService.createAddress(body, authUserId);
    }
}
