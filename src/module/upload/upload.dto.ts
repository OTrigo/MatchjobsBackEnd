import { IsOptional } from 'class-validator';

export class fileDTO {
  fieldname: string;
  originalname: string;
  mimetype: string;
  @IsOptional()
  buffer: Buffer;
  size: number;
}
export class nameDTO {
  nameFile: string;
  userid: string
}

