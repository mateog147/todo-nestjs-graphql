import { Module } from '@nestjs/common';
import { TodoResolver } from './resolvers/todo.resolver';
import { TodoService } from './services/todo.service';

@Module({
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
