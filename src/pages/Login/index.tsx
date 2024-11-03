import { RoutePath } from "@/common";
import { useGetNewSession } from "@/network";
import { useAuthUserStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const Login = () => {
	const navigate = useNavigate();
	const { mutateAsync: getNewSession, isPending } = useGetNewSession();
	const [doLogin] = useAuthUserStore(useShallow((state) => [state.doLogin]));

	useEffect(() => {
		getNewSession()
			.then((res) => {
				doLogin(res);
				navigate(RoutePath.HOME);
			})
			.catch((error) => {
				console.log("error", error);
			});
	}, []);

	return <div></div>;
};

export default Login;
