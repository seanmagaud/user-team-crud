import { EntityBase } from '@app/entity-inheritance/entity.base';
import { UserEntity } from '@app/user/user.entity';
import { BeforeUpdate, Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'teams' })
export class TeamEntity extends EntityBase {
  @Column()
  name: string;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToMany(() => UserEntity, (user) => user.teams, { cascade: true })
  users: UserEntity[];

  // A user can have multiple teams
  // A team can have multiple users
}
