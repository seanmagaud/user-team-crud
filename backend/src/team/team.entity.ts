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

  @ManyToMany(() => UserEntity, (user) => user.teams)
  users: UserEntity[];

  // Faire la validation côté front uniquement
  // Un user peut avoir plusieurs teams
  // Un team peut avoir plusieurs users
  // Plusieurs users peuvent avoir plusieurs teams
  // Plusieurs teams peuvent avoir plusieurs users
  // Il ne peut pas avoir de relation One,
  // On fait du manytomany et on fait la validation côté front uniquement
}
