import { GetPostRequestDto } from '@posts/dto/request.dto/get-post-request.dto';

describe('get-post-request.dto.spec.ts', () => {
  it('size 기본값 10 잘 됨?', () => {
    const getPostRequestDto = new GetPostRequestDto();
    expect(getPostRequestDto.size).toBe(10);
  });

  it('page 기본값 1 잘 됨?', () => {
    const getPostRequestDto = new GetPostRequestDto();
    expect(getPostRequestDto.page).toBe(1);
  });
});
