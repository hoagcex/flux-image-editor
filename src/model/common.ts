import { LazyExoticComponent } from "react";

export interface Response<T> {
	responseData?: T;
	error?: ErrorResponse;
	statusCode?: number;
	message?: string;
}
export interface ErrorResponse {
	code?: number;
	message?: string;
}

export interface DataListResponse<T> {
	total?: number;
	loadMore?: boolean;
	nextPageIndex?: number;
	data?: T;
	list?: T;
}

export type TextFieldValue = string | undefined;

export interface RoutesChildProps {
	routeCode: string;
	path: string;
	sideMenuLink?: string;
	name: string;
	isShowSideMenu?: boolean;
	icon?: string;
	public?: boolean;
	component: LazyExoticComponent<(props: any) => JSX.Element>;
	card?: {
		class: string;
		icon: any;
	};
}
export interface RoutesProps {
	path: string;
	name?: string;
	icon: string;
	isShowSideMenu: boolean;
	splitPath?: string;
	public?: boolean;
	component?: () => JSX.Element;
	childComponent?: RoutesChildProps[];
}

export type NotificationType = "success" | "info" | "warning" | "error";

export interface Department {
	id?: number;
	departmentName?: string;
	departmentCode?: string;
	parentId?: number;
	departmentType?: string;
	createBy?: string;
	createAt?: number;
	updateBy?: string;
	updateAt?: number;
	departmentFullname?: string;
	departmentLevel?: number;
	ttkd?: string;
	pbhkv?: string;
	parentPath?: string;
	children?: Department[];
	// key?: string;
	// title?: string;
}

export interface DepartmentHRM {
	id: number;
	vnpt_ma_don_vi: string;
	name: string;
	parent_id?: number | null;
	cap_dv: number;
	children?: DepartmentHRM[] | any;
}

export interface BaseListRequest {
	pageSize?: number;
	pageIndex?: number;
	orderBy?: string;
	orderDirection?: string;
	startDate?: string;
	endDate?: string;
}

export interface SavedAccount {
	id?: number;
	name?: string;
	username?: string;
	password?: string;
}

export interface GlobalConfig {
	appConfigId?: number;
	seasonalEnable?: boolean;
	seasonalCursorDefaultUrl?: string;
	seasonalCursorPointerUrl?: string;
	seasonalBackgroundUrl?: string;
}
