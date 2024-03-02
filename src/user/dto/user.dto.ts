import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsArray,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class UserDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsArray()
  posts: object[];
}

export class CreateUserDto extends UserDto {
  @IsOptional()
  id: number;
}

export class LoginUserDto extends UserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
