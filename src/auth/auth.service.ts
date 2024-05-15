import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Injectable({})
export class authService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(dto: CreateUserDto) {
    const password = await hash(dto.password, 12);

    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (emailExists !== null) {
      throw new HttpException('E-mail already in use', HttpStatus.CONFLICT);
    }
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: password,
      },
    });
    return this.signInToken(user.email, user.password);
  }

  async signIn(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      const match = await compare(dto.password, user.password);
      if (match) return this.signInToken(user.email, user.password);
    }
    throw new HttpException('Wrong Email or Password', HttpStatus.UNAUTHORIZED);
  }

  async signInToken(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      email: email,
      password: password,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
