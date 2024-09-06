import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.team.findMany();
  }

  async findOne(id: number) {
    return this.prisma.team.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.team.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.team.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.team.delete({ where: { id } });
  }
}
