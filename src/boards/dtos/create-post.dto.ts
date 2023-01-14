export class CreatePostDto {
  private readonly _title: string;
  private readonly _content: string;
  private readonly _authorId: string;
  private readonly _authorPassword: string;
  private readonly _mebership: boolean;

  constructor(postData: {
    title: string;
    content: string;
    authorId: string;
    authorPassword?: string;
    mebership: boolean;
  }) {
    this._title = postData.title;
    this._content = postData.content;
    this._authorId = postData.authorId;
    this._authorPassword = postData.authorPassword;
    this._mebership = postData.mebership;
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

  public get authorPassword(): string {
    return this._authorPassword;
  }

  public get mebership(): boolean {
    return this._mebership;
  }
}
