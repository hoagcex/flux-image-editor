import { AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { isNil } from "lodash";
import { useAuthUserStore } from "@/store";
import { getAccessToken } from "@/utils";

const doLogout = useAuthUserStore.getState().doLogout;

export function addExtraInfo(config: InternalAxiosRequestConfig) {
	const token = getAccessToken();
	if (isNil(token)) {
		doLogout();
		return Promise.reject();
	}

	const headers: AxiosRequestHeaders = config.headers;
	headers.Authorization = "Bearer " + token;

	return { ...config, headers: headers };
}

export function onRejected(error: AxiosError) {
	// console.log("onRejected", error);

	return Promise.reject(error);
}
