import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableExchange1644888841864 implements MigrationInterface {
    name = 'addTableExchange1644888841864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`services\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exchanges\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`discount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`totalAmount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`user_id\` int NULL, \`service_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exchanges\` ADD CONSTRAINT \`FK_e9163a94e04700841ca4067a209\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exchanges\` ADD CONSTRAINT \`FK_7e410f04477d948c16c61c519d6\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchanges\` DROP FOREIGN KEY \`FK_7e410f04477d948c16c61c519d6\``);
        await queryRunner.query(`ALTER TABLE \`exchanges\` DROP FOREIGN KEY \`FK_e9163a94e04700841ca4067a209\``);
        await queryRunner.query(`DROP TABLE \`exchanges\``);
        await queryRunner.query(`DROP TABLE \`services\``);
    }

}
