import bcrypt from 'bcrypt';

import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto TEST', () => {
  describe('CreateUserDto.toEntity test', () => {
    it('CreateUserDto.toEntity가 password를 hash하나?', async () => {
      const nickname = 'nickname';
      const password = 'password';

      const createUserDto = new CreateUserDto();
      createUserDto.nickname = nickname;
      createUserDto.password = password;

      const toEntity = await createUserDto.toEntity();

      expect(toEntity.nickname).toBe(nickname);
      expect(await bcrypt.compare(password, toEntity.password)).toBe(true);
    });
  });
});
