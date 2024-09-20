export interface ICreateTaskRequest {
     id          String @id @default (uuid())
    taskId      String @unique
    title       String
    description String
    priority    TASK_PRIORITY @default (MEDIUM)
    status      TASK_STATUS @default (TODO)
    Users       User[]
    SubTasks    SubTask[]
    createdAt   DateTime @default (now()) @map("created_at")
    updatedAt   DateTime @updatedAt @map("updated_at")
    isDeleted   Boolean @default (false) @map("is_deleted")
}