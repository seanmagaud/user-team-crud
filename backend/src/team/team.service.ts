import { UserService } from '@app/user/user.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/createTeam.dto';
import { UpdateTeamDto } from './dto/updateTeam.dto';
import { TeamEntity } from './team.entity';

@Injectable() // DI nest system
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>, // private userService: UserService,
  ) {}
  async createTeam(createTeamDto: CreateTeamDto): Promise<TeamEntity> {
    if (
      await this.teamRepository.findOne({
        name: createTeamDto.name,
      })
    ) {
      throw new HttpException(
        'Name already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    // let users = await this.userService.findByIds(createTeamDto.users);
    // console.log(users);
    const newTeam = new TeamEntity();
    // newTeam.users = createTeamDto.users;
    Object.assign(newTeam, createTeamDto); // https://docs.nestjs.com/techniques/serialization
    console.log(newTeam);
    return await this.teamRepository.save(newTeam);
  }

  async findById(teamId: number): Promise<TeamEntity> {
    return this.teamRepository.findOne(teamId);
  }

  async findAll(): Promise<TeamEntity[]> {
    return this.teamRepository.find({ relations: ['users'] });
  }

  async updateTeam(
    teamId: number,
    updateTeamDto: UpdateTeamDto,
  ): Promise<TeamEntity> {
    const team = await this.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team does not exist!');
    }
    Object.assign(team, updateTeamDto);

    return await this.teamRepository.save(team);
  }

  async deleteTeam(teamId: number): Promise<HttpStatus> {
    const team = await this.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team does not exist!');
    }
    await this.teamRepository.remove(team);

    return HttpStatus.OK;
  }

  buildTeamResponse(team: TeamEntity): TeamEntity {
    return team;
  }
}
