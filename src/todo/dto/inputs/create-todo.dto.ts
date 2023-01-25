import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoDto {
  @Field(() => String, { description: 'Que hay pa hacer' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}
