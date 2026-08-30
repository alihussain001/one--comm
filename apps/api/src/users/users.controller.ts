import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() body: { name: string }, @Req() request) {
    console.log(request.user.id, request.user.email);
    return this.userService.createUser(body.name);
  }
}
