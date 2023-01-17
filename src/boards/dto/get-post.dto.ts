// 🌏 Project imports
import { Board } from '../entities/board.entity';
import { OrderBoardModel, SelectBoardModel } from '../entities/board.model';

export class GetPostDto {
  private readonly _postId: number;

  constructor(postData: { postId: number }) {
    this._postId = postData.postId;
  }

  public get postId(): number {
    return this._postId;
  }

  public toGetOneEntity() {
    return {
      select: SelectBoardModel.selectBoard(),
      whereBoard: Board.byPk({ id: this._postId }),
    };
  }

  static toGetAllEntity() {
    return {
      select: SelectBoardModel.selectBoardList(),
      order: OrderBoardModel.orderBoardList(),
    };
  }
}
