// 🌏 Project imports
import { Board } from '../entities/board.entity';

export class CreatePostDto {
  private readonly _title: string;
  private readonly _content: string;
  private readonly _authorId: string;
  private readonly _password: string;
  private readonly _membership: boolean;

  constructor(postData: {
    title: string;
    content: string;
    authorId: string;
    membership: boolean;
    password?: string;
  }) {
    this._title = postData.title;
    this._content = postData.content;
    this._authorId = postData.authorId;
    this._password = postData.password;
    this._membership = postData.membership;
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

  public get membership(): boolean {
    return this._membership;
  }

  public toEntity() {
    return Board.createBoard({
      title: this._title,
      content: this._content,
      authorId: this._authorId,
      password: this._password,
      membership: this._membership,
    });
  }
}
