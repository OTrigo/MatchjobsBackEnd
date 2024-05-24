import { IsOptional } from 'class-validator';

export class videoDTO {
  fieldname: string;
  originalname: string;
  mimetype: string;
  @IsOptional()
  buffer: Buffer;
  size: number;
}
export class nameVideoDTO {
  nameFile: string;
}
export class namepostDTO{
  name: string;
}
export class descriptionpostDTO{
  description: string;
}
export class userIdpostDTO{
  userId: string;
}
export class urlpostDTO{
  url: string;
}
export class supaResultDTO{
  data: {
		path: string,
		id: string,
		fullPath: string
	}
	error: string|null
}
