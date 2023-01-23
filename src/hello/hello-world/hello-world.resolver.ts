import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hola!';
  }

  @Query(() => Float)
  randomNumber(): number {
    return Math.random() * 10;
  }

  @Query(() => Int)
  getRandomFromZeroTo(@Args('to', { type: () => Int }) to: number): number {
    return Math.floor(Math.random() * to);
  }
}
