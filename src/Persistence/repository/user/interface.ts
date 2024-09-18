import { User } from "@prisma/client";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findByResetKey(resetKey: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    createUser(data: {
        password: string;
        email: string;
        name: string;
    }): Promise<User>;
    updateResetKey(
        id: number,
        resetKey: string | null,
        resetKeyExpired: Date | null
    ): Promise<void>;

    changePassword(id: number, password: string): Promise<void>;
}
