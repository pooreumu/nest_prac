controller - service - repository 구조로 프로젝트를 설계하는데
typeorm에서 제공하는 Repository를 service에 주입할 지 repository에 주입할 지 고민이다

service가 특정 orm에 의존하지 않게 repository에 주입하려고 했는데
쿼리빌더로 만드는 복잡한 쿼리가 아닌 find, insert, update, delete같은 단순한 것들은
service에 바로 주입해 사용하는 것 같다.
공식문서에서도 service에 바로 주입하는 예시가 있고
다른 사람들이 한 것들을 봐도 service에 바로 주입하는 경우가 많아서
이게 nest의 방식인가 싶기도 해서 고민이다.
