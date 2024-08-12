import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { jobDto } from 'src/job/dto';
import { UserDto } from 'src/user/dto';

export class CompanyDto {
  @IsString()
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
  @IsOptional()
  rating: number;

  @IsInt()
  @ApiProperty()
  employeeAmount: number;

  @IsArray()
  @IsOptional()
  jobs: jobDto[];

  user: UserDto;
}
