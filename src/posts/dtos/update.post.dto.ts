import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ required: false, type: String })
  @IsString({ message: 'Please provide valid title value.' })
  @IsOptional()
  title: string;

  @ApiProperty({ required: false, type: String })
  @IsString({ message: 'Please provide valid descriptio value.' })
  @IsOptional()
  description: string;
}
