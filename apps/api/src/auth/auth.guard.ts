
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorized bearer',
      );
    }

    const token = authorization.slice(7);

    let authUser;

    // Verify Supabase authentication
    try {
      authUser = await this.supabaseService.getUser(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Find internal Prisma user
    const dbUser = await this.prismaService.user.findUnique({
      where: {
        authUserId: authUser.id,
      },
      select: {
        id: true,
        authUserId: true,
        email: true,
        name: true,
      },
    });

    if (!dbUser) {
      throw new UnauthorizedException(
        'User not registered in application database',
      );
    }

    // Attach internal database user
    request.user = dbUser;

    return true;
  }
}
