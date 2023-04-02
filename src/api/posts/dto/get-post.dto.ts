// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';
import { Exclude, Expose } from 'class-transformer';

// 🌏 Project imports
import { DateTimeUtil } from '@lib/util/date-time-util';

import { GetCommentDto } from '@comments/dto/get-comment.dto';
import { Comment } from '@comments/entities/comment.entity';

import { Post } from '../entities/post.entity';
import { SelectPostModel } from '../entities/post.model';

export class GetPostDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _authorId: string;
  @Exclude() private readonly _createdAt: LocalDateTime | Date;
  @Exclude() private readonly _updatedAt: LocalDateTime | Date;
  @Exclude() private readonly _comments: Comment[];

  constructor(post: Post) {
    this._id = post.id;
    this._title = post.title;
    this._content = post.content;
    this._authorId = post.authorId;
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

  @ApiProperty()
  @Expose()
  get comments(): GetCommentDto[] {
    return this._comments?.map((comment) => new GetCommentDto(comment));
  }

  static toGetOneEntity(postData: { postId: number }) {
    return {
      select: SelectPostModel.selectPost(),
      wherePost: Post.byPk({ id: postData.postId }),
    };
  }
}
