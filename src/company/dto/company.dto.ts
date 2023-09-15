import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { jobDto } from 'src/job/dto';

export class CompanyDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  sector: string;

  @IsNumber()
  @ApiProperty()
  rating: number;

  @IsInt()
  @ApiProperty()
  employeeAmount: number;

  @IsArray()
  @IsOptional()
  jobs: jobDto[];
}
