import { MigrationInterface, QueryRunner } from "typeorm";

export class ReafactoringUser1715926284107 implements MigrationInterface {
    name = 'ReafactoringUser1715926284107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6e467882bdf2f63ddddde11867"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_6e467882bdf2f63ddddde11867e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "msisdn"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "msisdn" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_6e467882bdf2f63ddddde11867e" UNIQUE ("msisdn")`);
        await queryRunner.query(`CREATE INDEX "IDX_6e467882bdf2f63ddddde11867" ON "user" ("msisdn") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6e467882bdf2f63ddddde11867"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_6e467882bdf2f63ddddde11867e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "msisdn"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "msisdn" character varying(13) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_6e467882bdf2f63ddddde11867e" UNIQUE ("msisdn")`);
        await queryRunner.query(`CREATE INDEX "IDX_6e467882bdf2f63ddddde11867" ON "user" ("msisdn") `);
    }

}
