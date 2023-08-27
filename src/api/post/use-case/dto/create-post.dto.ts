import { LocalDateTime } from '@js-joda/core';

import { DateTimeUtil } from '@lib/util/date-time-util';

import { CreatePostResponse } from '@post/controller/response/create-post.response';

export class CreatePostDto {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _content: string;
  private readonly _userId: number;
  private readonly _createdAt: LocalDateTime;
  private readonly _updatedAt: LocalDateTime;

  constructor(param: {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = param.id;
    this._title = param.title;
    this._content = param.content;
    this._userId = param.userId;
    this._createdAt = DateTimeUtil.toLocalDateTime(param.createdAt);
    this._updatedAt = DateTimeUtil.toLocalDateTime(param.updatedAt);
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get userId(): number {
    return this._userId;
  }

  get createdAt(): LocalDateTime {
    return this._createdAt;
  }

  get updatedAt(): LocalDateTime {
    return this._updatedAt;
  }

  toResponse() {
    return new CreatePostResponse({
      id: this.id,
      title: this.title,
      content: this.content,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
