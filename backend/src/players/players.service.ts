import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.player.findMany({ include: { team: true } });
  }

  async findOne(id: number) {
    return this.prisma.player.findUnique({
      where: { id },
      include: { team: true },
    });
  }

  async create(data: any) {
    return this.prisma.player.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.player.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.player.delete({ where: { id } });
  }
}
