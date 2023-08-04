export interface UseCase<Input, Output> {
  execute(args: Input): Promise<Output>;
}
