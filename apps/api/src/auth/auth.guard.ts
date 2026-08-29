import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SupabaseService } from 'src/users/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    
        if (!authorization || !authorization.startsWith('Bearer ')) {
          throw new UnauthorizedException('Missing or invalid authorized bearer');
        }

    const token = authorization.slice(7);

    const {data, error} = await this.supabaseService.getUser(token);

    if(error || !data.user){
      throw new UnauthorizedException('Invalid or expired token');
    }
    
    request.user = data.user;
    
    return true;
  }
}
