import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from 'src/user/dto';

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
        id: dto.id,
        name: dto.name,
        email: dto.email,
        password: password,
        role: 'User',
      },
    });
    return this.signInToken(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
    );
  }

  async signIn(dto: LoginUserDto) {
    console.log(dto);
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      const match = await compare(dto.password, user.password);
      if (match)
        return this.signInToken(
          user.id,
          user.name,
          user.email,
          user.password,
          user.role,
        );
    }
    throw new HttpException('Wrong Email or Password', HttpStatus.UNAUTHORIZED);
  }

  async signInToken(
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: id,
      name: name,
      email: email,
      password: password,
      role: role,
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
