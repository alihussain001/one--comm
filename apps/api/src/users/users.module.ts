import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SupabaseService } from './supabase.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SupabaseService, AuthGuard]
})
export class UsersModule {}
