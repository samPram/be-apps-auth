import { MigrationInterface, QueryRunner } from "typeorm";

export class ReafactoringUserIndex1715928468305 implements MigrationInterface {
    name = 'ReafactoringUserIndex1715928468305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e467882bdf2f63ddddde11867"`);
        await queryRunner.query(`CREATE INDEX "unique_msisdn" ON "user" ("msisdn") `);
        await queryRunner.query(`CREATE INDEX "unique_username" ON "user" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."unique_username"`);
        await queryRunner.query(`DROP INDEX "public"."unique_msisdn"`);
        await queryRunner.query(`CREATE INDEX "IDX_6e467882bdf2f63ddddde11867" ON "user" ("msisdn") `);
        await queryRunner.query(`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
    }

}
