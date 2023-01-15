// 📦 Package imports
import {
  FindOptionsOrder,
  FindOptionsOrderValue,
  FindOptionsSelect,
} from 'typeorm';

// 🌏 Project imports
import { Board } from './board.entity';

export class SelectBoardModel implements FindOptionsSelect<Board> {
  id?: boolean;
  title?: boolean;
  content?: boolean;
  authorId?: boolean;
  password?: boolean;
  membership?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;

  public static selectBoardList() {
    const boardModel = new SelectBoardModel();
    boardModel.id = true;
    boardModel.title = true;
    boardModel.content = true;
    boardModel.authorId = true;
    boardModel.membership = true;
    boardModel.createdAt = true;
    boardModel.updatedAt = true;

    return boardModel;
  }
}
export class OrderBoardModel implements FindOptionsOrder<Board> {
  id?: FindOptionsOrderValue;
  title?: FindOptionsOrderValue;
  content?: FindOptionsOrderValue;
  authorId?: FindOptionsOrderValue;
  password?: FindOptionsOrderValue;
  membership?: FindOptionsOrderValue;
  createdAt?: FindOptionsOrderValue;
  updatedAt?: FindOptionsOrderValue;

  public static orderBoardList() {
    const boardModel = new OrderBoardModel();
    boardModel.id = 'desc';

    return boardModel;
  }
}
