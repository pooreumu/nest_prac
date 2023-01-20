// 📦 Package imports
import { ChronoUnit, LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { Board } from '../entities/board.entity';

export class UpdatePostDto {
  private readonly _postId: number;
  private readonly _password: string;
  private readonly _title: string;
  private readonly _content: string;

  constructor(postData: {
    postId: number;
    password: string;
    title?: string;
    content?: string;
  }) {
    this._postId = postData.postId;
    this._title = postData.title;
    this._content = postData.content;
    this._password = postData.password;
  }

  public get postId(): number {
    return this._postId;
  }

  public get password(): string {
    return this._password;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public toEntity(updatedAt: LocalDateTime) {
    return Board.updateBoard({
      postId: this._postId,
      password: this._password,
      title: this._title,
      content: this._content,
      updatedAt: updatedAt.truncatedTo(ChronoUnit.SECONDS),
    });
  }
}
