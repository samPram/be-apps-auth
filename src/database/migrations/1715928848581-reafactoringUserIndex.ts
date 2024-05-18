import { MigrationInterface, QueryRunner } from "typeorm";

export class ReafactoringUserIndex1715928848581 implements MigrationInterface {
    name = 'ReafactoringUserIndex1715928848581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "msisdn" character varying(20) NOT NULL, "username" character varying(12) NOT NULL, "password" character varying(144) NOT NULL, CONSTRAINT "unique_msisdn" UNIQUE ("msisdn"), CONSTRAINT "unique_username" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_msisdn" ON "user" ("msisdn") `);
        await queryRunner.query(`CREATE INDEX "index_username" ON "user" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_username"`);
        await queryRunner.query(`DROP INDEX "public"."index_msisdn"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
