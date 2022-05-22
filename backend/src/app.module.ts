import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from './ormconfig';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
