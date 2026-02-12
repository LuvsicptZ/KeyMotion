import { request } from "./client";
import { setToken } from "./token";

export type User = {
    id: string;
    username: string;
    email?: string;
    createdAt: string;
};

export type RegisterInput = {
    username: string;
    email: string;
    password: string;
  };
  
export type LoginInput = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
}

export const register = async (input: RegisterInput) => 
    request<User>("/auth/register", {
        method: "POST",
        body: JSON.stringify(input)
    });

export const login = async (input: LoginInput) => {
    const data = await request<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
    });
    setToken(data.accessToken)
    return data;
}

export const getMe = () => 
    request<User>("/auth/me");
