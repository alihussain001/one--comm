import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, SupabaseAuthGuard],
})
export class UsersModule {}