# Cron

@nestjs/schedule에서 제공하는 Cron을 사용해보자.

## 설치

```bash
npm i --save @nestjs/schedule
```

## AppModule

```typescript
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService],
})
export class AppModule {
}
```

## CronJob

```typescript
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  // @Cron()에 인자로 시간이 들어가면 그 시간에 실행됨
  // EVERY_10_SECONDS = "*/10 * * * * *",
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron1() {
    console.log('10초에 한번씩 실행됨');
  }

  @Cron(new Date(Date.now() + 10000))
  handleCron2() {
    console.log('서버 실행되고 10초 후에 한번 실행됨');
  }
}
```

---

# 참고

https://docs.nestjs.com/techniques/task-scheduling