// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

export class UpdatePostRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}
