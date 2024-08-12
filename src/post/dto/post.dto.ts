import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class postDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  videoUrl: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsObject()
  @IsOptional()
  user: object;

  @IsOptional()
  @IsString()
  jobId: string;
}
