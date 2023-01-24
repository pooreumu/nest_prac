// 📦 Package imports
import { ChronoUnit, LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { Post } from '../entities/post.entity';

export class CreatePostDto {
  private readonly _title: string;
  private readonly _content: string;
  private readonly _authorId: string;
  private readonly _password: string;

  constructor(postData: {
    title: string;
    content: string;
    authorId: string;
    password?: string;
  }) {
    this._title = postData.title;
    this._content = postData.content;
    this._authorId = postData.authorId;
    this._password = postData.password;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get authorId(): string {
    return this._authorId;
  }

  public get password(): string {
    return this._password;
  }

  public toEntity(createdAt: LocalDateTime) {
    return Post.createPost({
      title: this._title,
      content: this._content,
      authorId: this._authorId,
      password: this._password,
      createdAt: createdAt.truncatedTo(ChronoUnit.SECONDS),
    });
  }
}
