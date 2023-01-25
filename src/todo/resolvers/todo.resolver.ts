import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dto/inputs/create-todo.dto';
import { UpdateTodoDto } from '../dto/inputs/updateTodo.dto';

@Resolver()
export class TodoResolver {
  constructor(private service: TodoService) {}
  @Query(() => [Todo], { name: 'todos' })
  findAll(): Todo[] {
    return this.service.findAll();
  }
  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.service.findOne(id);
  }
  //las mutation son las que reciben algo para modificar la data, reciben un input que equivale a un body
  @Mutation(() => Todo)
  createTodo(
    @Args('dto', { type: () => CreateTodoDto }) dto: CreateTodoDto,
  ): Todo {
    return this.service.create(dto);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('dto', { type: () => UpdateTodoDto }) dto: UpdateTodoDto,
  ): Todo {
    return this.service.update(dto);
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args('id', { type: () => Int }) id: number): boolean {
    return this.service.delete(id);
  }
}
