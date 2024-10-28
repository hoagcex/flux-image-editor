import { RoutePath } from "@/common";
import { InputBase } from "@/components";
import { useGetNewSession } from "@/network";
import { useAuthUserStore } from "@/store";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Form, Typography } from "antd";
import { isEmpty, isNil } from "lodash";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useShallow } from "zustand/react/shallow";

interface FieldType {
	username: string;
	password: string;
}

const Login = () => {
	const schema = yup
		.object({
			username: yup.string().required("Nhập tên đăng nhập"),
			password: yup.string().required("Nhập mật khẩu"),
		})
		.required();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FieldType>({
		resolver: yupResolver(schema),
	});
	const { mutateAsync: login, isPending } = useGetNewSession();
	const [doLogin] = useAuthUserStore(useShallow((state) => [state.doLogin]));
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const onFinish = handleSubmit((data) => {
		setErrorMessage("");
		login({
			username: data.username ?? "",
			password: data.password ?? "",
		})
			.then((res) => {
				doLogin(res);
				navigate(RoutePath.HOME);
			})
			.catch((_) => {
				setErrorMessage("Đã có lỗi");
			});
	});

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-backgroundPageHeaderDark">
			<div
				style={{
					borderRadius: 4,
				}}
				className={cn(
					"bg-white/70 dark:bg-backgroundDark/70 backdrop-blur-md p-8 max-w-sm w-full z-10 shadow-lg dark:shadow-sm dark:shadow-background",
				)}
			>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
					{/* <AppIcon /> */}
					<Typography.Title level={2}>{"Đăng nhập"}</Typography.Title>
				</div>

				<Form
					name="basic"
					layout="vertical"
					initialValues={{ remember: true }}
					autoComplete="off"
					size="large"
					className="space-y-6 mt-6"
				>
					<Form.Item>
						<Controller
							name="username"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<InputBase
									label={"Username"}
									placeholder={"Username"}
									{...field}
									error={!isNil(errors.username)}
									errorMessage={errors.username?.message}
								/>
							)}
						/>
					</Form.Item>
					<Form.Item>
						<Controller
							name="password"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<InputBase
									label={"Password"}
									placeholder={"Password"}
									type="password"
									{...field}
									error={!isNil(errors.password)}
									errorMessage={errors.password?.message}
								/>
							)}
						/>
					</Form.Item>

					{isEmpty(errorMessage) ? undefined : <Alert message={errorMessage} type="error" />}
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="w-full"
							loading={isPending}
							onClick={() => void onFinish()}
						>
							{"Đăng nhập"}
						</Button>
					</Form.Item>
				</Form>
			</div>
			{/* <div className="absolute top-4 right-4">
				<ThemeSwitcher />
			</div> */}
		</div>
	);
};

export default Login;
