import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './team.controller';
import { TeamEntity } from './team.entity';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
