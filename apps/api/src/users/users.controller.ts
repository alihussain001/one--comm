import { AuthGuard } from 'src/auth/auth.guard';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create (or fetch) the app profile for the logged-in Supabase identity.
  // Reachable with only a valid Supabase token — no existing app profile required.
  @UseGuards(SupabaseAuthGuard)
  @Post('me')
  async createUser(
    @Body() body: CreateUserDto,
    @Req() request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authUser = request.user;
    const { user, created } = await this.userService.upsertUser({
      authUserId: authUser.id,
      email: authUser.email,
      name: body.name,
    });
    res.status(created ? 201 : 200);
    // Cast internal numeric id to string to match the frontend contract (UUID-ish string ids).
    return { ...user, id: String(user.id) };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() request) {
    const user = await this.userService.getUserByAuthUserId(request.user.authUserId);
    if (!user) {
      // Should not happen because AuthGuard already verified, but keep a safe fallback.
      return null;
    }
    return { ...user, id: String(user.id) };
  }
}