import { UserEntity } from '@app/user/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly users: UserEntity[];
}
