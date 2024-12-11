import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class jobDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsBoolean()
  @IsOptional()
  available: boolean;

  @IsString()
  companyId: string;

  @IsObject()
  @IsOptional()
  company: object;

  @IsObject()
  @IsOptional()
  user: object;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  postId: string;
}

export class selectJobDto extends PartialType(jobDto) {}
