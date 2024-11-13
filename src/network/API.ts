import {
	CurrentStatusResponse,
	ListImageRequest,
	ListImageResponse,
	LoginRequest,
	LoginResponse,
	LogoutRequest,
	NewSessionResponse,
	Response,
	WorkFlowListResponse,
	WorkFlowResponse,
} from "@/model";
import { AxiosRequestConfig } from "axios";
import ApiManager from "./APIManager";
import Endpoint from "./Endpoint";

interface APIService {
	get<R>(url: string, params?: object, config?: AxiosRequestConfig): Promise<R>;
	post<R>(url: string, params: object, config?: AxiosRequestConfig): Promise<R>;
	put<R>(url: string, params: object, config?: AxiosRequestConfig): Promise<R>;
	delete<R>(url: string, params: object, config?: AxiosRequestConfig): Promise<R>;
}

class HTTPClient implements APIService {
	private instance: APIService;

	constructor(instance: APIService) {
		this.instance = instance;
	}

	get<R>(url: string, params?: object): Promise<R> {
		return this.instance.get(url, params);
	}
	post<R>(url: string, params: object, config?: AxiosRequestConfig): Promise<R> {
		return this.instance.post(url, params, config);
	}
	put<R>(url: string, params: object, config?: AxiosRequestConfig): Promise<R> {
		return this.instance.put(url, params, config);
	}
	delete<R>(url: string, params: object, config?: AxiosRequestConfig): Promise<R> {
		return this.instance.delete(url, params, config);
	}
}

class API {
	client: HTTPClient;
	publicClient: HTTPClient;
	encryptClient: HTTPClient;
	eirClient: HTTPClient;

	constructor() {
		const apiBaseUrl = (import.meta.env.REACT_APP_API_BASE_URL as string) ?? "";
		// const apiBaseUrl = "http://10.144.13.103:8085/api/";

		const instance = ApiManager.getInstance(apiBaseUrl);
		this.client = new HTTPClient(instance);

		const publicInstance = ApiManager.getInstance(apiBaseUrl, false);
		this.publicClient = new HTTPClient(publicInstance);

		const encryptInstance = ApiManager.getInstance(apiBaseUrl, true);
		this.encryptClient = new HTTPClient(encryptInstance);

		const eirInstance = ApiManager.getInstance((import.meta.env.REACT_APP_EIR_API_URL as string) ?? "");
		this.eirClient = new HTTPClient(eirInstance);
	}

	login = (params: LoginRequest): Promise<Response<LoginResponse>> => {
		return this.publicClient.post<Response<LoginResponse>>(Endpoint.LOGIN, params);
	};

	logout = (params: LogoutRequest): Promise<Response<boolean>> => {
		return this.publicClient.post<Response<boolean>>(Endpoint.LOGOUT, params);
	};
	getNewSession = (): Promise<NewSessionResponse> => {
		return this.publicClient.post<NewSessionResponse>(
			Endpoint.GET_NEW_SESSION,
			{ session_id: null },
			// {
			// 	headers: {
			// 		authorization: "Basic " + btoa(params.username + ":" + params.password),
			// 	},
			// },
		);
	};

	getListWorkFlows = (): Promise<WorkFlowListResponse> => {
		return this.client.post<WorkFlowListResponse>(Endpoint.LIST_WORK_FLOWS, {});
	};
	readWorkFlow = (name: string): Promise<WorkFlowResponse> => {
		return this.client.post<WorkFlowResponse>(Endpoint.READ_WORK_FLOW, { name });
	};
	getCurrentStatus = (): Promise<CurrentStatusResponse> => {
		return this.client.post<CurrentStatusResponse>(Endpoint.GET_CURRENT_STATUS, {});
	};
	listModels = (): Promise<CurrentStatusResponse> => {
		return this.client.post<CurrentStatusResponse>(Endpoint.LIST_MODELS, {});
	};
	listImages = (params: ListImageRequest): Promise<ListImageResponse> => {
		return this.client.post<ListImageResponse>(Endpoint.LIST_IMAGES, params);
	};
}

export default new API();
