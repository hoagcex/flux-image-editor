import { RoutePath } from "@/common";
import { AppSpinner } from "@/components";
import { useAuthUserStore } from "@/store";
import { ReactNode, Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useSearchParams } from "react-router-dom";

const Logout = lazy(() => import("@/pages/Logout"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Home = lazy(() => import("@/pages/Home"));

const ProtectedRoute = () => {
	const { pathname } = useLocation();

	const user = useAuthUserStore((state) => state.user);
	if (!user) {
		if (pathname === RoutePath.HOME) return <Navigate replace to={RoutePath.LOGIN} />;
		const redirectUrl = RoutePath.LOGIN + "?redirectUrl=" + pathname;
		return <Navigate replace to={redirectUrl} />;
	}
	return <Outlet />;
};

const AuthRoute = ({ children }: { children: ReactNode }): JSX.Element => {
	const [searchParams] = useSearchParams();
	const redirectUrl = searchParams.get("redirectUrl") ?? "";

	const user = useAuthUserStore((state) => state.user);

	if (user) {
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
					<Route path={RoutePath.HOME} element={<Home />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export { AppRoutes };
