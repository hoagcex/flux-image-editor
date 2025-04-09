import { AxiosError, AxiosResponse } from "axios";
import { Response } from "@/model";
import { useAuthUserStore } from "@/store";
const doLogout = useAuthUserStore.getState().doLogout;

export function responseSuccess(response: AxiosResponse<Response<any>>) {
	const code = response.data.statusCode;

	if (code === 403) {
		doLogout();
		return Promise.reject();
	}
	return response;
}

export const responseError = (error: AxiosError) => {
	// console.log("responseError", error);
	// const response = error.response;

	// if (response && response.data === ServerCode.FORBIDDEN) {
	// 	doLogout();
	// 	return;
	// }
	return Promise.reject(error);
};
