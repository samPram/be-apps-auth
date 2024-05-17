import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationInit1715918744277 implements MigrationInterface {
    name = 'MigrationInit1715918744277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "msisdn" character varying(13) NOT NULL, "username" character varying(12) NOT NULL, "password" character varying(144) NOT NULL, CONSTRAINT "UQ_6e467882bdf2f63ddddde11867e" UNIQUE ("msisdn"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e467882bdf2f63ddddde11867" ON "user" ("msisdn") `);
        await queryRunner.query(`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e467882bdf2f63ddddde11867"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
