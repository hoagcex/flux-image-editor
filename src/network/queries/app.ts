import { LoginRequest, LogoutRequest } from "@/model";
import API from "@/network/API";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => useMutation({ mutationFn: (params: LoginRequest) => API.login(params) });

export const useLogout = () => useMutation({ mutationFn: (params: LogoutRequest) => API.logout(params) });

export const useGetNewSession = () => useMutation({ mutationFn: () => API.getNewSession() });
