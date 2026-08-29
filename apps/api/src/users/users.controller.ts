import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { Body, Controller,  Post, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() body : { name: string }){
        return this.userService.createUser(body.name);
    }
}

