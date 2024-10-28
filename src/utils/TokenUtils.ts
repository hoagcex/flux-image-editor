import Cookies from "universal-cookie";

export const getAccessToken = (): string => {
	const cookies = new Cookies();
	const token = cookies.get(import.meta.env.REACT_APP_APIKEY_NAME ?? "access_token") as string;
	return token;
};
