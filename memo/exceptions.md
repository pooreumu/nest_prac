# throw vs return Promise.reject()

```ts
try {
  if (!result.affected) throw new ForbiddenException();
} catch (e) {
  throw e
}
```

예외처리를 위 처럼 하면 IntelliJ에서 다음과 같은 경고를 한다.  
**'throw' of exception caught locally**

동작은 문제없이 한다. 근데 좋은 코드는 아닌 가 보다 그러니까 경고를 하겠지.

```ts
function a() {
  try {
    if (!result.affected) throw new ForbiddenException(); // (1)
  } catch (e) {
    throw e // (2)
  }
}

function b() {
  try {
    a()
  } catch (e) {
    throw e // (3)
  }
}
```

이런 코드가 있을 때 1번에서 발생한 코드가 바로 3번으로 가지 않고 2번으로 갔다가 3번으로 가는게 비효율적이어서 별로라고 하는건가 싶었다.
try-catch의 catch의 용도를 벗어난 사용법이라 경고한다는
글<sup>[1]</sup>도 있었다.

그래서 이렇게 바꿨다.

```ts
try {
  if (!result.affected) return Promise.reject(new ForbiddenException());
} catch (e) {
  throw e
}
```

그리고 지금 이 프로젝트에서 sonarcloud를 이용하는데 위 코드처럼 `catch`블록에서 아무것도 하지 않고 `throw`만 바로 하면 code smell이 감지되는데 내용이 **"catch" clauses
should do more than rethrow** 이다.

그래서 이 code smell을 없애기 위해 아래처럼 바꿨다.

```ts
try {
  if (!result.affected) return Promise.reject(new ForbiddenException());
} catch (e) {
  throw new InternalServerErrorException(e);
}
```

이렇게 바꾸고 나니까 IntelliJ가 `exception`을 `local`에 던지는 건 좋지 않다고 알려주는 이유가 와닿는다.
`exception`을 `local`에 던지지않게 바꾸지 않았으면 다음과 같은 모습인데

```ts
try {
  if (!result.affected) throw new ForbiddenException();
} catch (e) {
  throw new InternalServerErrorException(e);
}
```

이렇게 되면 `throw new ForbiddenException();`이 동작하지 않을 테니까

```ts
try {
  if (!result.affected) throw new ForbiddenException();
} catch (e) {
  throw e instanceof ForbiddenException
    ? e
    : new InternalServerErrorException(e);
}
```

이런식이 되던가 했을텐데 이걸 보니까

> try-catch의 catch 블록에서 exception 핸들링은 개발자가 "미처 예상하지 못한 에러"를 위한 것이다.<sup>[1]</sup>

라고 하는 의미가 잘 와닿는다.


---

# 참고

1) https://velog.io/@milkcoke/Node.js-Throw-of-exception-caught-locally

[1]: https://velog.io/@milkcoke/Node.js-Throw-of-exception-caught-locally



