import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import { verify } from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/jwtPayload';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordValid = await verify(user.password, password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(user: User) {
    const { accessToken } = await this.generateToken(user.id);
    return {
      id: user.id,
      name: user.name,
      avatar: user.image,
      accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const currentUser = { id: user.id };
    return currentUser;
  }
}
