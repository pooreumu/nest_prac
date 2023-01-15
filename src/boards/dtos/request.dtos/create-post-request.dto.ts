// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiProperty()
  @IsOptional()
  @IsAlphanumeric()
  password?: string;
}
