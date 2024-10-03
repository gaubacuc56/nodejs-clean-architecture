import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1727927843240 implements MigrationInterface {
    name = 'Init1727927843240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`SubTask\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`parent_id\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`taskId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Task\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`priority\` enum ('0', '1', '2') NOT NULL DEFAULT '1', \`status\` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`reset_key\` varchar(255) NOT NULL, \`reset_key_expired\` datetime NOT NULL, \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '2', UNIQUE INDEX \`IDX_1ecfabfdf655a33c62d9a2c16d\` (\`reset_key_expired\`), UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UserPersonalInfo\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`user_id\` varchar(255) NOT NULL, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, UNIQUE INDEX \`IDX_391fe0d8de6a6198dd80fec528\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`SubTask\` ADD CONSTRAINT \`FK_f6264bf5d0b8dfd0c0d9b99e55c\` FOREIGN KEY (\`taskId\`) REFERENCES \`Task\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`SubTask\` DROP FOREIGN KEY \`FK_f6264bf5d0b8dfd0c0d9b99e55c\``);
        await queryRunner.query(`DROP INDEX \`IDX_391fe0d8de6a6198dd80fec528\` ON \`UserPersonalInfo\``);
        await queryRunner.query(`DROP TABLE \`UserPersonalInfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_1ecfabfdf655a33c62d9a2c16d\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Task\``);
        await queryRunner.query(`DROP TABLE \`SubTask\``);
    }

}
