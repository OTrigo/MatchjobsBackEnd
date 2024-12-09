import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBusinessUserDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/user/dto';

@Injectable({})
export class authService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(dto: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (emailExists !== null) {
      throw new HttpException('E-mail already in use', HttpStatus.CONFLICT);
    }

    const password = await hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
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
      user.portifolio,
      user.companyId,
    );
  }

  async signUpBusiness(dto: CreateBusinessUserDto) {
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
        role: 'Company',
        companyId: dto.companyId,
      },
    });

    return this.signInToken(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.portifolio,
      user.companyId,
    );
  }

  async signUpLinkedin(req: any, res: any, query: any) {
    if (query.code) {
      return { url: `/redirect/?code=${query.code}` };
    }
    return { url: '404' };
  }

  async signIn(dto: LoginUserDto) {
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
          user.portifolio,
          user.companyId,
        );
    }
    throw new HttpException('Wrong Email or Password', HttpStatus.UNAUTHORIZED);
  }

  async createAccountLinkedin(body: any) {
    if (body === null) {
      throw new HttpException('Request Body is empty', HttpStatus.BAD_REQUEST);
    }

    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (emailExists !== null) {
      return this.signInToken(
        body.id,
        body.name,
        body.email,
        body.password,
        body.role,
        body.portifolio,
        body.companyId,
      );
    }

    const password = await hash(
      Math.random().toString(36).slice(2, 10) + '!@',
      12,
    );

    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
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
      user.portifolio,
      user.companyId,
    );
  }

  async signInToken(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    portifolio: string | null,
    companyId: string | null,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: id,
      name: name,
      email: email,
      password: password,
      role: role,
      portifolio: portifolio,
      companyId: companyId,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '14d',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
