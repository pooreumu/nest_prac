```typescript
@Column({
  name: 'author_id',
  type: 'varchar',
  comment: '게시글 작성자 아이디',
})
authorId

@Column({
  name: 'user_id',
  type: 'varchar',
  comment: '게시글 작성자 아이디',
})
userId
```

- @Column() 데코레이터에 name 옵션은 사용하지 않는게 좋은 거 같다.
- userId로 바꾸려고 할 때 name 옵션도 바꿔줘야 돼서 까먹으면 의도와 다르게 동작할 수 있다.
- TypeOrmModuleOptions 에 namingStrategy 옵션을 설정해주면 자동으로 snake_case 로 바꿔준다.

```typescript
namingStrategy: new SnakeNamingStrategy()
```
