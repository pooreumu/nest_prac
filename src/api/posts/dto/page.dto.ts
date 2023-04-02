import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

export class PageDto<T> {
  @Exclude() private readonly _totalPages: number;
  @Exclude() private readonly _items: T[];

  constructor(totalCount: number, size: number, items: T[]) {
    this._totalPages = Math.ceil(totalCount / size);
    this._items = items;
  }

  @ApiProperty()
  @Expose()
  get totalPages(): number {
    return this._totalPages;
  }

  @ApiProperty()
  @Expose()
  get items(): T[] {
    return this._items;
  }
}
