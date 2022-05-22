import { UserEntity } from '@app/user/user.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdateTeamDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly users: UserEntity;
}
