import { ApiProperty } from '@nestjs/swagger';

import { LocalDateTime } from '@js-joda/core';
import { Exclude, Expose } from 'class-transformer';

import { DateTimeUtil } from '@lib/util/date-time-util';

export class CreatePostResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _userId: number;
  @Exclude() private readonly _comments: Comment[];
  @Exclude() private readonly _createdAt: string;
  @Exclude() private readonly _updatedAt: string;

  constructor({
    id,
    title,
    content,
    userId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt: LocalDateTime;
    updatedAt: LocalDateTime;
  }) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._userId = userId;
    this._comments = [];
    this._createdAt = DateTimeUtil.toString(createdAt);
    this._updatedAt = DateTimeUtil.toString(updatedAt);
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
  get comments(): Comment[] {
    return this._comments;
  }

  @ApiProperty()
  @Expose()
  get createdAt(): string {
    return this._createdAt;
  }

  @ApiProperty()
  @Expose()
  get updatedAt(): string {
    return this._updatedAt;
  }
}
