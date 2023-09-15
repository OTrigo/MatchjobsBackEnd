import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class jobDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;

  @IsBoolean()
  @ApiProperty()
  available: boolean;

  @ApiProperty()
  @IsNumber()
  companyId: number;

  @IsObject()
  company: object;
}
