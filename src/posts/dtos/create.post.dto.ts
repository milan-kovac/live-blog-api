import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ required: true, type: String })
  @IsString({ message: 'Please provide valid title value.' })
  title: string;

  @ApiProperty({ required: true, type: String })
  @IsString({ message: 'Please provide valid descriptio value.' })
  description: string;
}
