import {MigrationInterface, QueryRunner} from "typeorm";

export class alterColumnExchange1644894664066 implements MigrationInterface {
    name = 'alterColumnExchange1644894664066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchanges\` ADD \`code\` varchar(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchanges\` DROP COLUMN \`code\``);
    }

}
