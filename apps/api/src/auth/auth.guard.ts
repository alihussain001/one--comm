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

    try {
      const user = await this.supabaseService.getUser(token)
    
    
    request.user = user;
    
    return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token")
    }
  }
}
