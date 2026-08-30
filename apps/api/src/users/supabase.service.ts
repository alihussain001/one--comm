import { createClient, User } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor(private  readonly configService: ConfigService) {
    this.supabase = createClient(
      this.configService.getOrThrow<string>('SUPABASE_URL'),
      this.configService.getOrThrow<string>('SUPABASE_SECRET_KEY'),
    );
  }
  async getUser(token: string): Promise<User>{
    const {data, error} = await this.supabase.auth.getUser(token);
    
    if (error || !data.user) {
      throw new Error('Invalid or expired token');
    }
    return data.user;
  }
}
