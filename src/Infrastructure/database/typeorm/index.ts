import { config } from "@Infrastructure/config";
import { DataSource } from "typeorm";
import path from "path";
import { User } from "@Domain/entities/User";
import { UserPersonalInfo } from "@Domain/entities/UserPersonalInfo";
import { Task } from "@Domain/entities/Task";
import { SubTask } from "@Domain/entities/SubTask";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT as number,
    username: config.DB_USERNAME,
    password: undefined,
    database: config.DB_SCHEMA,
    synchronize: true,
    logging: true,
    entities: [User, UserPersonalInfo, Task, SubTask],
    subscribers: [],
    migrations: [path.join(__dirname, "./migrations/*.ts")],
})