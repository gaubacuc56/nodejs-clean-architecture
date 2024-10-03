import {
    Entity,
    Column,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { User } from './User';
import { SubTask } from './SubTask';
import { BaseSoftDelete } from '@Domain/common/base-entity/base';

export enum TASK_STATUS {
    TODO,
    IN_PROGRESS,
    FAILED,
    FINISHED,
    CLOSED,
}

export enum TASK_PRIORITY {
    LOW,
    MEDIUM,
    HIGH,
}

@Entity({ name: 'Task' })

export class Task extends BaseSoftDelete {
    @Column()
    public title!: string;

    @Column()
    public description!: string;

    @Column({
        type: 'enum',
        enum: TASK_PRIORITY,
        default: TASK_PRIORITY.MEDIUM,
    })
    public priority!: TASK_PRIORITY;

    @Column({
        type: 'enum',
        enum: TASK_STATUS,
        default: TASK_STATUS.TODO,
    })
    public status!: TASK_STATUS;

    @ManyToMany(() => User, (user) => user.tasks)
    public Users!: User[];

    @OneToMany(() => SubTask, (subTask) => subTask.task)
    public SubTasks!: SubTask[];
}
