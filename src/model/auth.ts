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

export interface NewSessionResponse {
	session_id?: string;
	user_id?: string;
	output_append_user?: boolean;
	version?: string;
	server_id?: string;
	count_running?: number;
}
