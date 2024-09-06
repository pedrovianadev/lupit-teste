import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(Number(id));
  }

  @Post()
  create(@Body() createTeamDto: any) {
    return this.teamsService.create(createTeamDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: any) {
    return this.teamsService.update(Number(id), updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(Number(id));
  }
}
