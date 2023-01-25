import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StatusArgs } from '../dto/args/status.args';
import { CreateTodoDto } from '../dto/inputs/create-todo.dto';
import { UpdateTodoDto } from '../dto/inputs/updateTodo.dto';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Primera tarea',
      done: false,
    },
    {
      id: 2,
      description: 'Segunda tarea',
      done: false,
    },
    {
      id: 3,
      description: 'Tercera tarea',
      done: true,
    },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done == true).length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => todo.done == false).length;
  }
  findAll(statusArgs?: StatusArgs): Todo[] {
    if (statusArgs && statusArgs.status != undefined) {
      return this.todos.filter((todo) => todo.done == statusArgs.status);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (todo == undefined) {
      throw new HttpException('todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  create(dto: CreateTodoDto): Todo {
    const id = Math.max(...this.todos.map((item) => item.id), 0) + 1;
    const newTodo: Todo = {
      id: id,
      description: dto.description,
      done: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(dto: UpdateTodoDto): Todo {
    const todo = this.findOne(dto.id);

    if (dto.description) {
      todo.description = dto.description;
    }
    if (dto.done != undefined) {
      todo.done = dto.done;
    }

    this.todos.map((item) => {
      if (item.id === dto.id) {
        return todo;
      } else {
        return item;
      }
    });
    return todo;
  }

  delete(id: number): boolean {
    const todo = this.findOne(id);
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    return true;
  }
}
