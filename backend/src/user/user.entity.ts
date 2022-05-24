import { EntityBase } from '@app/entity-inheritance/entity.base';
import { TeamEntity } from '@app/team/team.entity';
import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends EntityBase {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ default: 1 })
  role: number;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @JoinTable()
  @ManyToMany(() => TeamEntity, (team) => team.users)
  teams: TeamEntity[];

  // A user can have multiple teams
  // A team can have multiple users
}
