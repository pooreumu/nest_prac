// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly authorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly authorPassword: string;
}
