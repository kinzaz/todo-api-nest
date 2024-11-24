import { Injectable } from '@nestjs/common';
import { TaskModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateTaskDto): Promise<TaskModel> {
    return this.prismaService.taskModel.create({
      data: dto,
    });
  }

  async delete(id: string): Promise<TaskModel> {
    return this.prismaService.taskModel.delete({ where: { id: Number(id) } });
  }

  async get(id: string): Promise<TaskModel> {
    return this.prismaService.taskModel.findFirst({
      where: { id: Number(id) },
    });
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskModel> {
    return this.prismaService.taskModel.update({
      where: { id: Number(id) },
      data: dto,
    });
  }

  async getAll(): Promise<TaskModel[]> {
    return this.prismaService.taskModel.findMany();
  }
}
