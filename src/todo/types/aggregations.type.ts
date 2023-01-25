import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'todo quick aggregations' })
export class AggregationsType {
  @Field()
  total: number;

  @Field()
  pending: number;

  @Field()
  completed: number;
}
