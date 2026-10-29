import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './DTO/create-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateAddressDto } from './DTO/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Post()
  createAddress(@Body() body: CreateAddressDto, @Req() req: any) {
    const authUserId: string = req.user.id;

    return this.addressService.createAddress(body, authUserId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getAddressById(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.addressService.getAddressById(id, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateAddress(
    @Body() body: UpdateAddressDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.addressService.updateAddress(body, req.user.id, id);
  }
}
