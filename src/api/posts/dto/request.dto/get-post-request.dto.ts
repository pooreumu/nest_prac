import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional } from 'class-validator';

import { PostModel } from '@posts/entities/post.model';

export class GetPostRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  size?: number = 10;

  toEntityForPagination() {
    return new PostModel(this.page, this.size);
  }
}
