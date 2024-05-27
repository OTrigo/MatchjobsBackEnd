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
  @IsOptional()
  id: number;

  @IsString()
  name: string;

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

  @IsNumber()
  companyId: number;

  @IsObject()
  @IsOptional()
  company: object;

  @IsObject()
  @IsOptional()
  user: object;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsOptional()
  postId: number;
}
