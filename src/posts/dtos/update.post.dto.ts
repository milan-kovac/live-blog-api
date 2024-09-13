import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString({ message: 'Please provide valid title value.' })
  @IsOptional()
  title: string;

  @IsString({ message: 'Please provide valid descriptio value.' })
  @IsOptional()
  description: string;
}
