export interface UseCase<Input, Output> {
  execute(args: Input): Promise<Output>;
}

export const USE_CASE = Symbol('USE_CASE');
