import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { UserModel } from 'generated/prisma/models';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createUser(
    @Body() userData: { name: string },
    @Req() request,
  ): Promise<UserModel> {
    const { name } = userData;
    return this.userService.createUser({
      authUserId: request.user.id,
      email: request.user.email,
      name,
    });
  }

  @Get()
  async getUser(){
    return this.userService.getUser();
  }
}
