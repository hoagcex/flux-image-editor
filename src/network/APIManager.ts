import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as AccessTokenInterceptor from "./interceptors/AccessToken";
import * as AuthInterceptor from "./interceptors/Auth";
import * as TransformInterceptor from "./interceptors/Transform";

const getInstance = (baseURL: string, withToken = true) => {
	const instance = axios.create({
		baseURL: baseURL,
		timeout: 60000,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			// authorization:
			// 	"Basic " + btoa(import.meta.env.REACT_APP_SV_USERNAME + ":" + import.meta.env.REACT_APP_SV_KEY),
		},
	});

	instance.interceptors.response.use(AuthInterceptor.responseSuccess, AuthInterceptor.responseError);

	if (withToken) {
		instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			return AccessTokenInterceptor.addExtraInfo(config);
		}, AccessTokenInterceptor.onRejected);
	}
	instance.interceptors.response.use((res: AxiosResponse<any, any>) => {
		return TransformInterceptor.transformResponse(res);
	}, TransformInterceptor.transformError);

	return instance;
};

const ApiManager = {
	getInstance: (baseUrl: string, withToken = true) => {
		const axiosInstance = getInstance(baseUrl, withToken);
		return axiosInstance;
	},
};

export default ApiManager;
