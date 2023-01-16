// 📦 Package imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ChronoUnit, convert, LocalDateTime, nativeJs } from '@js-joda/core';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'varchar',
    comment: '게시글 내용',
  })
  content: string;

  @Column({
    name: 'author_id',
    type: 'varchar',
    comment: '게시글 작성자 아이디',
  })
  authorId: string;

  @Column({
    name: 'password',
    type: 'varchar',
    comment: '게시글 비밀번호',
    nullable: true,
  })
  password: string;

  @Column({
    name: 'membership',
    type: 'bool',
    comment: '회원 여부',
  })
  membership: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    comment: '게시글 게시 시간',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    comment: '게시글 수정 시간',
    nullable: true,
  })
  updatedAt: Date;

  transformDateTo(entityValue: LocalDateTime): Date {
    return convert(entityValue).toDate();
  }

  transformDateFrom(databaseValue: Date): LocalDateTime {
    return LocalDateTime.from(nativeJs(databaseValue));
  }

  static createBoard(
    title: string,
    content: string,
    authorId: string,
    password: string,
    membership: boolean,
  ): Board {
    const board = new Board();
    board.title = title;
    board.content = content;
    board.authorId = authorId;
    board.password = password;
    board.membership = membership;
    board.createdAt = board.transformDateTo(
      LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS),
    );

    return board;
  }

  static updateBoard(
    postId: number,
    password: string,
    title?: string,
    content?: string,
  ): { whereBoard: Board; updateBoard: Board } {
    const whereBoard = new Board();
    whereBoard.id = postId;
    whereBoard.password = password;

    const updateBoard = new Board();
    updateBoard.title = title;
    updateBoard.content = content;
    updateBoard.updatedAt = updateBoard.transformDateTo(
      LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS),
    );

    return { whereBoard, updateBoard };
  }

  static byPk(id: number) {
    const board = new Board();
    board.id = id;

    return board;
  }

  static deleteBy(id: number, password: string) {
    const board = new Board();
    board.id = id;
    board.password = password;

    return board;
  }
}
