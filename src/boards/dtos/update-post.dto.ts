export class UpdatePostDto {
  private readonly _title: string;
  private readonly _content: string;
  private readonly _password: string;

  constructor(postData: {
    title?: string;
    content?: string;
    password: string;
  }) {
    this._title = postData.title;
    this._content = postData.content;
    this._password = postData.password;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get password(): string {
    return this._password;
  }
}
