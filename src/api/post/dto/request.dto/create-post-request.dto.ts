import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { CreatePostCommand } from '../../use-case/command/create-post.command';

export class CreatePostRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  public toCreatePostDto(userId: number): CreatePostCommand {
    return new CreatePostCommand({
      title: this.title,
      content: this.content,
      userId,
    });
  }
}
