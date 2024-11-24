import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post('task')
  async create(@Body() dto: CreateTaskDto) {
    const taskDb = await this.taskService.create(dto);

    return { ...taskDb, id: Number(taskDb.id) };
  }

  @Delete('task/:id')
  async delete(@Param('id') id: string) {
    const taskDb = await this.taskService.delete(id);
    return { ...taskDb, id: Number(taskDb.id) };
  }

  @Get('task/:id')
  async get(@Param('id') id: string) {
    const taskDb = await this.taskService.get(id);
    return { ...taskDb, id: Number(taskDb.id) };
  }

  @Patch('task/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const taskDb = await this.taskService.update(id, dto);
    return { ...taskDb, id: Number(taskDb.id) };
  }

  @Get('tasks')
  async getAll() {
    const tasksDb = await this.taskService.getAll();

    return tasksDb.map((task) => ({
      ...task,
      id: Number(task.id),
    }));
  }
}
