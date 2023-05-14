// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import { Exclude, Expose } from 'class-transformer';

// 🌏 Project imports
import { DateTimeUtil } from '@lib/util/date-time-util';

import { GetCommentDto } from '@comments/dto/get-comment.dto';
import { Comment } from '@comments/entities/comment.entity';

import { Post } from '../entities/post.entity';

export class GetPostDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _userId: number;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;
  @Exclude() private readonly _comments: Comment[];

  constructor(post: Post) {
    this._id = post.id;
    this._title = post.title;
    this._content = post.content;
    this._userId = post.userId;
    this._createdAt = post.createdAt;
    this._updatedAt = post.updatedAt;
    this._comments = post.comments;
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get title(): string {
    return this._title;
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

  @ApiProperty()
  @Expose()
  get comments(): GetCommentDto[] {
    return this._comments?.map((comment) => new GetCommentDto(comment));
  }
}
