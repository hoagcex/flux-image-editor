import { AxiosError, AxiosResponse } from "axios";

export function transformResponse(response: AxiosResponse<any, any>) {
	return Promise.resolve(response.data);
}

export function transformError(error?: AxiosError) {
	// console.log("transformError", error);

	return Promise.reject(error?.response?.data);
}
