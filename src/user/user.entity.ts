import { EntityBase } from '@app/entity-inheritance/entity.base';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  LEAD = 'Squad Leader',
  DEV = 'Squad Member',
  INTERN = 'Intern',
}

@Entity({ name: 'users' })
export class UserEntity extends EntityBase {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.INTERN,
  })
  role: UserRole;

  //@ManyToOne(() => TeamEntity, (team) => team.name)
  //team: TeamEntity[];
}
