export interface User {
	id?: number;
	fullName?: string;
	username?: string;
	password?: string;
	position?: string;
	lastSendOTP?: number;
	lastLogin?: number;
	numOfLogin?: number;
	dob?: string;
	email?: string;
	department?: string;
	createAt?: string;
	createBy?: string;
	isEnable?: string;
	phoneNumber?: string;
	updateAt?: string;
	updateBy?: string;
	avatar?: string;
	avatarBase64?: string;
	otp?: string;
	province?: string;
	hrmid?: string;
	address?: string;
	departmentCode?: string;
	listRoleId?: number[];
	telegramChatID?: string;
	status?: number;
}

export interface UserListRequest {
	pageSize?: number;
	pageIndex?: number;
	searchTxt?: string;
	departmentCode?: string;
}

export interface UserHRMParams {
	pageSize: number;
	pageIndex: number;
	email: string;
}

export interface UserHRM {
	employee_code: string;
	name: string;
	phone?: string;
	email: string;
	dob?: string;
	gender?: string;
	department?: string;
	position?: string;
}

export interface UserInformationResponse {
	user?: User;
}

export interface UserChangePassword {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface UserForgotPassword {
	username: string;
}

export interface UserIdRequest {
	userId?: number;
}
