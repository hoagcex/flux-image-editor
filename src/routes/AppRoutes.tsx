import { RoutePath } from "@/common";
import { AppSpinner } from "@/components";
import { getAccessToken } from "@/utils";
import { ReactNode, Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useSearchParams } from "react-router-dom";

const Logout = lazy(() => import("@/pages/Logout"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home"));

const ProtectedRoute = () => {
	const { pathname } = useLocation();

	const token = getAccessToken();
	if (!token) {
		if (pathname === RoutePath.HOME) return <Navigate replace to={RoutePath.LOGIN} />;
		const redirectUrl = RoutePath.LOGIN + "?redirectUrl=" + pathname;
		return <Navigate replace to={redirectUrl} />;
	}
	return <Outlet />;
};

const AuthRoute = ({ children }: { children: ReactNode }): JSX.Element => {
	const [searchParams] = useSearchParams();
	const redirectUrl = searchParams.get("redirectUrl") ?? "";

	const token = getAccessToken();

	if (token) {
		if (redirectUrl) {
			return <Navigate replace to={redirectUrl} />;
		}
		return <Navigate replace to={RoutePath.HOME} />;
	}
	return children ? <>{children}</> : <Outlet />;
};

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<AppSpinner />}>
				<Routes>
					<Route
						path={RoutePath.LOGIN}
						element={
							<AuthRoute>
								<Login />
							</AuthRoute>
						}
					/>

					<Route element={<ProtectedRoute />}>
						<Route path={RoutePath.HOME} element={<Home />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export { AppRoutes };
