# Module

## @Module()

```ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
```

A라는 서비스에서 B라는 서비스를 주입 받아서 사용하려고 할 때 B모듈에서 B서비스를 export 해줘야한다.

```ts
// a.module.ts
@Module({
  imports: [BModule],
  providers: [AService],
})
export class AModule {
}

// a.service.ts
@Injectable()
export class AService {
  constructor(
    private readonly bService: BService,
  ) {
    // ...
  }

  // ...
}

// b.module.ts
@Module({
  providers: [BService],
  exports: [BService]
})
export class BModule {
}

// b.service.ts
@Injectable()
export class BService {
  // ...
}
```