// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';
import { Exclude, Expose } from 'class-transformer';

// 🌏 Project imports
import { DateTimeUtil } from '@lib/util/date-time-util';

import { Comment } from '../entities/comment.entity';

export class GetCommentDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _authorId: string;
  @Exclude() private readonly _createdAt: LocalDateTime | Date;
  @Exclude() private readonly _updatedAt: LocalDateTime | Date;

  constructor(comment: Comment) {
    this._id = comment.id;
    this._content = comment.content;
    this._authorId = comment.authorId;
    this._createdAt = comment.createdAt;
    this._updatedAt = comment.updatedAt;
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get content(): string {
    return this._content;
  }

  @ApiProperty()
  @Expose()
  get authorId(): string {
    return this._authorId;
  }

  @ApiProperty()
  @Expose()
  get createdAt(): string {
    return DateTimeUtil.toString(this._createdAt as LocalDateTime);
  }

  @ApiProperty()
  @Expose()
  get updatedAt(): string {
    return DateTimeUtil.toString(this._updatedAt as LocalDateTime);
  }
}
