// 📦 Package imports
import {
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { LocalDateTimeTransformer } from '../transformer/LocalDateTimeTransformer';

@Entity()
export class BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    comment: '생성 시간',
    transformer: new LocalDateTimeTransformer(),
  })
  createdAt: LocalDateTime | Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '수정 시간',
    transformer: new LocalDateTimeTransformer(),
  })
  updatedAt: LocalDateTime | Date;
}
