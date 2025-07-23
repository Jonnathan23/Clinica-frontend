import type z from "zod";
import type { userSchema } from "../utils/utils.schema";

export type LoginCredentials = {
    username: string;
    password: string;
};

export type RegisterCredentials = {
    username: string;
    password_hash: string;
};

export type User = z.infer<typeof userSchema>;