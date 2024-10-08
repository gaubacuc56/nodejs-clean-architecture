import { config } from "@Infrastructure/config";
import { DataSource, ObjectLiteral, Repository } from "typeorm";
import * as path from "path";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT as number,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_SCHEMA,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, "../../../Domain/entities/*.ts")],
    migrations: [path.join(__dirname, "/migrations/*.ts")],
    subscribers: [],
})

export const AppRepository = <T extends ObjectLiteral>(entity: { new(): T }): Repository<T> => {
    return AppDataSource.getRepository(entity);
};
