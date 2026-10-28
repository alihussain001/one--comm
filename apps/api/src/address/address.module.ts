import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports:[PrismaModule, SupabaseModule],
  controllers: [AddressController],
  providers: [AddressService, AuthGuard],
})
export class AddressModule {}
