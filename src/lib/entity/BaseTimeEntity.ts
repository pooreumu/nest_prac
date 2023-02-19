// 📦 Package imports
import {
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    comment: '생성 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '수정 시간',
  })
  updatedAt: Date;
}
