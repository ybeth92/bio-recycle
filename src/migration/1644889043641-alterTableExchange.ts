import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableExchange1644889043641 implements MigrationInterface {
    name = 'alterTableExchange1644889043641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`services\` ADD \`business\` varchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`services\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`services\` ADD \`name\` varchar(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`services\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`services\` ADD \`name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`services\` DROP COLUMN \`business\``);
    }

}
