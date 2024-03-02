import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor() {}

  async signUp(dto: CreateUserDto) {
    return;
  }

  async signIn(dto: CreateUserDto) {
    return;
  }

  async getUser(id: number) {}

  async getAll() {}

  async updateUser(id: number, dto: UpdateUserDto) {}

  async delete(id: number) {}
}
