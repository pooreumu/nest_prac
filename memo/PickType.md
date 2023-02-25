# PickType

```ts
import { PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class Entity {
  @IsString()
  column1: string

  @IsNumber()
  column2: number
}

class Dto extends PickType(Entity, [
  'column1'
] as const) {
}
```

pick type이란게 있는데 다른 클래스에서 properties를 선택해서 가져다 쓸수 있다.

validation이 없으면 에러가 난다.  
"an unknown value was passed to the validate function" 이런 내용의 에러가 난다.

dto만들때 좋다.

PickType 말고도 PartialType, OmitType, IntersectionType이 있다.
https://docs.nestjs.com/openapi/mapped-types

create dto와 update dto의 properties가 완전히 겹치면 PartialType쓰기도 좋을 것 같다.
