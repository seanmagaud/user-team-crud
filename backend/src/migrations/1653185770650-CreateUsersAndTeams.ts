import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersAndTeams1653185770650 implements MigrationInterface {
    name = 'CreateUsersAndTeams1653185770650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "role" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_teams_teams" ("usersId" integer NOT NULL, "teamsId" integer NOT NULL, CONSTRAINT "PK_bb05cc6462faa7baf501fa2adc0" PRIMARY KEY ("usersId", "teamsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d44297b07f4b6ea1418d2fedb" ON "users_teams_teams" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58b76a3454c868f649f25c0365" ON "users_teams_teams" ("teamsId") `);
        await queryRunner.query(`ALTER TABLE "users_teams_teams" ADD CONSTRAINT "FK_5d44297b07f4b6ea1418d2fedbc" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_teams_teams" ADD CONSTRAINT "FK_58b76a3454c868f649f25c03652" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_teams_teams" DROP CONSTRAINT "FK_58b76a3454c868f649f25c03652"`);
        await queryRunner.query(`ALTER TABLE "users_teams_teams" DROP CONSTRAINT "FK_5d44297b07f4b6ea1418d2fedbc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58b76a3454c868f649f25c0365"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d44297b07f4b6ea1418d2fedb"`);
        await queryRunner.query(`DROP TABLE "users_teams_teams"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
