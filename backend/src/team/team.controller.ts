import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/createTeam.dto';
import { UpdateTeamDto } from './dto/updateTeam.dto';
import { TeamEntity } from './team.entity';
import { TeamService } from './team.service';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('team')
  async createTeam(
    @Body('team')
    createTeamDto: CreateTeamDto,
  ): Promise<TeamEntity> {
    const team = await this.teamService.createTeam(createTeamDto);

    return this.teamService.buildTeamResponse(team);
  }

  @Get('team/:id')
  async currentTeam(
    @Param('id', ParseIntPipe) teamId: number,
  ): Promise<TeamEntity> {
    return this.teamService.findById(teamId);
  }

  @Get('teams')
  async teams(): Promise<TeamEntity[]> {
    return this.teamService.findAll();
  }

  @Put('team/:id')
  async updateTeam(
    @Param('id', ParseIntPipe) teamId: number,
    @Body('team')
    updateTeamDto: UpdateTeamDto,
  ): Promise<TeamEntity> {
    return this.teamService.updateTeam(teamId, updateTeamDto);
  }

  @Delete('team/:id')
  async deleteTeam(
    @Param('id', ParseIntPipe) teamId: number,
  ): Promise<HttpStatus> {
    return this.teamService.deleteTeam(teamId);
  }
}
