import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(Number(id));
  }

  @Post()
  create(@Body() createPlayerDto: any) {
    return this.playersService.create(createPlayerDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: any) {
    return this.playersService.update(Number(id), updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(Number(id));
  }
}
