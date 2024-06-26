import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class postDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  videoUrl: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsObject()
  @IsOptional()
  user: object;

  @IsOptional()
  @IsNumber()
  jobId: number;
}
