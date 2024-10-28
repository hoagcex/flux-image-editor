import { BaseListRequest } from "./common";

export interface ApiLogListRequest extends BaseListRequest {
	username?: string;
	uri?: string;
}

export interface ApiLog {
	requestId?: number;
	logTime?: string;
	logLevel?: string;
	timeStamp?: number;
	userName?: string;
	originIp?: string;
	severIp?: string;
	severPort?: string;
	type?: string;
	uri?: string;
	method: string;
	httpCode?: number;
	header?: string;
	params?: string;
	body?: string;
}

export interface ApiLogStats {
	date_time: string;
	total: number;
}
