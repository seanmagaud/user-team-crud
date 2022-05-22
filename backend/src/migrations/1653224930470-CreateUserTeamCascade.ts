import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTeamCascade1653224930470 implements MigrationInterface {
  name = 'CreateUserTeamCascade1653224930470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_teams_teams" DROP CONSTRAINT "FK_58b76a3454c868f649f25c03652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_teams_teams" ADD CONSTRAINT "FK_58b76a3454c868f649f25c03652" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_teams_teams" DROP CONSTRAINT "FK_58b76a3454c868f649f25c03652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_teams_teams" ADD CONSTRAINT "FK_58b76a3454c868f649f25c03652" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
