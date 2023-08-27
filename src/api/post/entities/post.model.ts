export class PostModel {
  private readonly _page: number;
  private readonly _size: number;
  private readonly _search?: string;

  constructor({
    page,
    size,
    search,
  }: {
    page: number;
    size: number;
    search?: string;
  }) {
    this._page = page;
    this._size = size;
    this._search = search;
  }

  getOffset() {
    return (this._page - 1) * this._size;
  }

  getLimit() {
    return this._size;
  }

  getSearch() {
    return this._search;
  }
}
