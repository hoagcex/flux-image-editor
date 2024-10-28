import { RoutePath } from "@/common";
import { AppSpinner } from "@/components";
import { LogoutRequest } from "@/model";
import { useLogout } from "@/network";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserStore } from "@/store";
import Cookies from "universal-cookie";
import { useShallow } from "zustand/react/shallow";

function Logout() {
	const cookies = new Cookies();
	const { mutateAsync: logout } = useLogout();
	const [doLogout] = useAuthUserStore(useShallow((state) => [state.doLogout]));
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const reqBody: LogoutRequest = {
				token: cookies.get("access_token") + "",
			};

			await logout(reqBody);
		} catch (err) {
			console.log(err);
		} finally {
			doLogout();
			navigate(RoutePath.LOGIN);
		}
	};
	useEffect(() => {
		void handleLogout();
	}, []);

	return <AppSpinner />;
}

export default Logout;
