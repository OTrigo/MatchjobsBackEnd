import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
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

  @IsOptional()
  @IsString()
  videoUrl: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  userId: string;

  @IsObject()
  @IsOptional()
  user: object;

  @IsOptional()
  @IsString()
  jobId: string;
}
