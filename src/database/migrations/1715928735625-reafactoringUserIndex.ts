import { MigrationInterface, QueryRunner } from "typeorm";

export class ReafactoringUserIndex1715928735625 implements MigrationInterface {
    name = 'ReafactoringUserIndex1715928735625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."unique_msisdn"`);
        await queryRunner.query(`DROP INDEX "public"."unique_username"`);
        await queryRunner.query(`CREATE INDEX "index_msisdn" ON "user" ("msisdn") `);
        await queryRunner.query(`CREATE INDEX "index_username" ON "user" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_username"`);
        await queryRunner.query(`DROP INDEX "public"."index_msisdn"`);
        await queryRunner.query(`CREATE INDEX "unique_username" ON "user" ("username") `);
        await queryRunner.query(`CREATE INDEX "unique_msisdn" ON "user" ("msisdn") `);
    }

}
