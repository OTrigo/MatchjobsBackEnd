import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsArray,
  IsUUID,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CompanyDto } from 'src/company/dto';

export class UserDto {
  @IsString()
  @ApiProperty()
  id: string;

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
  id: string;

  @IsOptional()
  role: string;
}

export class LoginUserDto extends UserDto {
  @IsOptional()
  id: string;

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
  id: string;

  @IsOptional()
  role: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  companyId: string;
}

export class UpdateUserDto extends PartialType(UserDto) {
  @IsNotEmpty()
  password: string;
  email: string;
}
