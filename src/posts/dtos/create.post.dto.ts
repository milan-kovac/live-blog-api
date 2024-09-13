import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Please provide valid title value.' })
  title: string;

  @IsString({ message: 'Please provide valid descriptio value.' })
  description: string;
}
