// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import { Exclude, Expose } from 'class-transformer';

// 🌏 Project imports
import { DateTimeUtil } from '@lib/util/date-time-util';

import { Comment } from '../entities/comment.entity';

export class GetCommentDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _userId: number;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;

  constructor(comment: Comment) {
    this._id = comment.id;
    this._content = comment.content;
    this._userId = comment.userId;
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
  get userId(): number {
    return this._userId;
  }

  @ApiProperty()
  @Expose()
  get createdAt(): string {
    return DateTimeUtil.toString(DateTimeUtil.toLocalDateTime(this._createdAt));
  }

  @ApiProperty()
  @Expose()
  get updatedAt(): string {
    return DateTimeUtil.toString(DateTimeUtil.toLocalDateTime(this._updatedAt));
  }
}
