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
import { CompanyDto } from 'src/company/dto';

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

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  company: CompanyDto;
}

export class CreateUserDto extends UserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  role: string;
}

export class LoginUserDto extends UserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  posts: object[];

  @IsOptional()
  role: string;
}

export class CreateBusinessUserDto extends UserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  role: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  companyId: number;
}

export class UpdateUserDto extends PartialType(UserDto) {
  @IsNotEmpty()
  password: string;
  email: string;
}
