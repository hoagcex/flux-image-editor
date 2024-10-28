import { RoutePath, VIEW_CODE } from "@/common";
import { useUserRolesStore } from "@/store";
import { Button, Result } from "antd";
import { isEmpty, isNil } from "lodash";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { PageWrapper } from "../PageWrapper";

/**
 * @deprecated Use multiple AuthRoute
 */
interface AuthRouteWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	viewCode?: string;
}

/**
 * @deprecated Use multiple AuthRoute
 */
export const AuthRouteWrapper = (props: AuthRouteWrapperProps): JSX.Element => {
	const { viewCode, children } = props;
	const [roles] = useUserRolesStore(useShallow((stt) => [stt.roles]));
	const navigate = useNavigate();

	if (isNil(viewCode) || isEmpty(viewCode)) {
		return children ? <>{children}</> : <Outlet />;
	}

	if (roles?.includes(viewCode) || viewCode === VIEW_CODE.PUBLIC) {
		return children ? <>{children}</> : <Outlet />;
	}

	return (
		<PageWrapper>
			<Result
				status="403"
				title="403"
				subTitle="Bạn không có quyền truy cập trang này"
				extra={
					<Button type="primary" onClick={() => navigate(RoutePath.HOME)}>
						Về trang chủ
					</Button>
				}
			/>
		</PageWrapper>
	);
};

/**
 * @deprecated Use multiple AuthRoute
 */
interface AuthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	viewCode?: string;
}

/**
 * @deprecated Use multiple AuthRoute
 */
export const AuthWrapper = (props: AuthWrapperProps): React.ReactNode => {
	const { children, viewCode } = props;
	const [roles] = useUserRolesStore(useShallow((stt) => [stt.roles]));

	if (isNil(viewCode) || isEmpty(viewCode)) {
		return <>{children}</>;
	}

	if (roles?.includes(viewCode) || viewCode === VIEW_CODE.PUBLIC) {
		return <>{children}</>;
	}
	return <></>;
};

interface AuthWrapperTProps extends React.HTMLAttributes<HTMLDivElement> {
	viewCode?: string[];
}

export const AuthWrapperT = (props: AuthWrapperTProps): React.ReactNode => {
	const { children, viewCode } = props;
	const [roles] = useUserRolesStore(useShallow((stt) => [stt.roles]));

	if (isNil(viewCode) || isEmpty(viewCode)) {
		return <>{children}</>;
	}

	for (let i = 0; i < viewCode.length; i++) {
		if (roles?.includes(viewCode[i]) || viewCode[i] === VIEW_CODE.PUBLIC) {
			return children ? <>{children}</> : <Outlet />;
		}
	}
	return <></>;
};

interface AuthRouteTWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	viewCode?: string[];
}

export const AuthRouteWrapperT = (props: AuthRouteTWrapperProps): JSX.Element => {
	const { viewCode, children } = props;
	const [roles] = useUserRolesStore(useShallow((stt) => [stt.roles]));
	const navigate = useNavigate();

	if (isNil(viewCode) || isEmpty(viewCode)) {
		return children ? <>{children}</> : <Outlet />;
	}

	for (let i = 0; i < viewCode.length; i++) {
		if (roles?.includes(viewCode[i]) || viewCode[i] === VIEW_CODE.PUBLIC) {
			return children ? <>{children}</> : <Outlet />;
		}
	}

	return (
		<PageWrapper>
			<Result
				status="403"
				title="403"
				subTitle="Bạn không có quyền truy cập trang này"
				extra={
					<Button type="primary" onClick={() => navigate(RoutePath.HOME)}>
						Về trang chủ
					</Button>
				}
			/>
		</PageWrapper>
	);
};
