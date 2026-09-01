import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SupabaseService } from './supabase.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, SupabaseService, AuthGuard]
})
export class UsersModule {}
