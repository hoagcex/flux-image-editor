import { useAuthUserStore } from "@/store";
import { getAccessToken } from "@/utils";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { isNil } from "lodash";

const doLogout = useAuthUserStore.getState().doLogout;

export function addExtraInfo(config: InternalAxiosRequestConfig) {
	const token = getAccessToken();

	if (isNil(token)) {
		doLogout();
		return Promise.reject();
	}

	config.data = {
		...config.data,
		session_id: token,
	};

	return config;
}

export function onRejected(error: AxiosError) {
	return Promise.reject(error);
}
