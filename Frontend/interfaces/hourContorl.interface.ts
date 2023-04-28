import { User } from "./user.interface";


export interface HourControl {
    id: number;
    user: User;
    start: number;
    end?: number;
    lastStart?: number;
    total?: number;
    ended?: 0 | 1;
    humanDate?: string;
    totalHuman?: string;
    createdAt?: Date;
    updatedAt?: Date;
}