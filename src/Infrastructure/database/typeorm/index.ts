import { config } from "@Infrastructure/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT as number,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_SCHEMA,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})