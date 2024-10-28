import { User } from "./user";

export interface LoginResponse {
	user?: User;
	access_token: string;
	expires_in?: string;
	token_type?: string;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LogoutRequest {
	token: string;
}
