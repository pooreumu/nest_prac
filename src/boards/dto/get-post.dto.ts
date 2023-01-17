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
    const select = SelectBoardModel.selectBoard();

    const whereBoard = Board.byPk({ id: this._postId });

    return { select, whereBoard };
  }

  static toGetAllEntity() {
    const select = SelectBoardModel.selectBoardList();

    const order = OrderBoardModel.orderBoardList();

    return { select, order };
  }
}
