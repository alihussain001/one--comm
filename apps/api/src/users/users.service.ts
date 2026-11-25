import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async upsertUser(data: Prisma.UserCreateInput): Promise<{ user: User; created: boolean }> {
    const existing = await this.prismaService.user.findUnique({
      where: { authUserId: data.authUserId },
    });
    if (existing) {
      // Idempotent: keep the existing profile (do not overwrite name on repeat calls).
      return { user: existing, created: false };
    }
    const user = await this.prismaService.user.create({ data });
    return { user, created: true };
  }

  async getUserByAuthUserId(authUserId: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { authUserId },
    });
  }
}