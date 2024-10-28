import { useCallback, useEffect, useMemo, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import "./ErrorPage.scss";
import { Button, Divider, Typography } from "antd";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDocumentTitle } from "@/hook";
// import { AppIcon } from "@/components";

const ErrorType = {
	ChunkLoadError: "ChunkLoadError",
	TypeError: "TypeError",
};

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
	useDocumentTitle("Lỗi");
	const [tryError, setTryError] = useState(true);

	const reloadPage = useCallback(() => {
		window.location.reload();
		return;
	}, []);

	const handleErrorCatch = useCallback(() => {
		if (error.name === ErrorType.ChunkLoadError) {
			reloadPage();
			return;
		}
		if (error.name === ErrorType.TypeError && error.message?.includes("fetch dynamically imported")) {
			reloadPage();
			return;
		}
		setTryError(false);
	}, [error.message, error.name, reloadPage]);

	useEffect(() => {
		console.log("catch-page-error", error);
		if (tryError) {
			handleErrorCatch();
		}
	}, [error]);

	const PictureContent = useMemo(() => {
		return (
			<div className="error-col-R">
				<svg x="0px" y="0px" viewBox="0 0 219.9 219.9">
					<g>
						<path
							className="error-st0"
							d="M35.9,81.2c-2.6-4.4-1.7-10.4,1.2-14.6s7.6-7,12.4-9c5.4-2.2,11.4-3.5,17-2.1c7.8,1.9,13.5,8.5,20.4,12.6 c14.5,8.6,32.7,5.9,49.2,2.8c4.9-0.9,9.8-1.8,14.8-1.4c4.6,0.4,9.1,1.9,13.3,3.9c17.4,8,31,22.7,40.5,39.2 c4.4,7.7,8.1,16.3,7.9,25.2c-0.5,16.5-15.1,30.2-31.2,33.5c-16.1,3.4-33-1.8-47.3-10c-3.8-2.2-7.6-4.6-11.8-5.5 c-4.6-1-9.3-0.1-13.9,0.8c-5.5,1.1-11,2.1-16.2,4.3c-5.7,2.4-10.8,6-16.5,8.3c-11.5,4.6-24.5,3.2-36.4-0.3 c-6.8-2-13.5-4.7-19.1-9.1s-10-10.5-11.3-17.5c-1.7-9.9,3.8-20.6,12.8-25c4.6-2.2,9.8-2.9,14.1-5.7c4.7-3,7.7-8.5,7.8-14.1 S40.6,86.6,36,83.5"
						/>{" "}
					</g>
					<path
						className="error-st1"
						d="M128.5,120.4h-10.7c-0.1-0.9-0.2-1.6-0.2-1.6l-16-3.5c-3.4-6.9-0.8-16.7-0.8-16.7v-8.9l-6,9.8 c-2,13.6,2,20.9,2,20.9c4.2,9.4,5.5,17.4,5.8,22.7c0.5,6.9-0.4,12.5-2,23.8c-1.1,7.2-2.2,13.2-3.1,17.4l19.1-5.8l0.4-30.6 c1.1-1.2,3.2-4,4.1-8.1c1.1-5.3-0.7-9.5-1.4-11L128.5,120.4z"
					/>
					<path
						className="error-st2"
						d="M116.6,179.4l0.4-30.6c1.1-1.2,3.2-4,4.1-8.1c1.1-5.3-0.7-9.5-1.4-11l8.9-8.5"
					/>
					<path
						className="error-st2"
						d="M93.7,99.5c-2,13.6,2,20.9,2,20.9c4.2,9.4,5.5,17.4,5.8,22.7c0.5,6.9-0.4,12.5-2,23.8 c-1.1,7.2-2.2,13.2-3.1,17.4"
					/>
					<path
						className="error-st3"
						d="M129.5,122.4h-25.8c-1.7,0-3-1.3-3-3V57.2c0-1.7,1.3-3,3-3h25.8c1.6,0,3,1.3,3,3v62.2 C132.5,121,131.1,122.4,129.5,122.4z"
					/>
					<path
						className="error-st1"
						d="M102.3,123.8c1.6-2.8,2.3-5.9,3.5-7.5c0.5-0.7,2.1-3.9,5.5-6.8c3.5-2.9,4.9-5.8,5.3-5.9c5.4-1.5,4,6,1.5,8.3 c-1.8,1.7-2.3,2-3.9,4.3c-1.5,2.1-0.9,4.8-0.6,7.6c0.6,5.1,1.6,6.4,1.2,10.1c-0.2,2.3-1.2,4-2,5.2"
					/>
					<path
						className="error-st2"
						d="M102.3,123.8c1.6-2.8,2.3-5.9,3.5-7.5c0.5-0.7,2.1-3.9,5.5-6.8c3.5-2.9,4.9-5.8,5.3-5.9c5.4-1.5,4,6,1.5,8.3 c-1.8,1.7-2.3,2-3.9,4.3c-1.5,2.1-0.9,4.8-0.6,7.6c0.6,5.1,1.6,6.4,1.2,10.1c-0.2,2.3-1.2,4-2,5.2"
					/>
					<path
						className="error-st4"
						d="M162.2,183.7c-1.1-1.3-2.2-2.6-2.8-4.2c-0.6-1.6-0.8-3.4,0.1-4.9c1.1-2,3.8-3,4.2-5.2c0.3-1.9-1.3-3.7-1.1-5.7 c0.1-1.9,2-3.4,3.9-3.6c1.9-0.3,3.8,0.4,5.6,1.2c1.2,0.5,2.5,1.2,3.5,2.1c1.6,1.4,2.5,3.6,2.5,5.7c0,0.8-0.1,1.5-0.5,2.2 c-0.3,0.5-0.9,0.9-1.4,1.3c-2.3,1.4-5.3,1.8-6.8,4c-0.7,1.1-0.9,2.4-1.3,3.7c-0.8,2.2-2.7,4-4.9,4.7"
					/>
					<circle className="error-st5" cx="31.6" cy="99.5" r="2.6" />
					<circle className="error-st6" cx="80.5" cy="182" r="2.6" />
					<circle className="error-st6" cx="200.2" cy="82.7" r="2.6" />
					<path
						className="error-st7"
						d="M185,81c1.3-0.8,2.6-1.5,4-2.2c0.9-0.4,1.8-0.8,2.7-1.4c3.2-2.1,4.6-6.5,3.5-10.2c-1.1-3.7-4.6-6.5-8.4-7 c-3.8-0.5-7.8,1.1-10.3,4c-1.2,1.4-2.1,3.1-2.2,4.9c0,0.9,0.1,1.8-0.2,2.7c-0.5,1.1-1.7,1.6-2.7,2.1c-1.8,0.8-3.7,1.8-5.4,2.8 c-1.2,0.7-2.4,1.5-3,2.8c-0.7,1.6-0.1,3.5,0.4,5.2c0.6,2.2,1,4.6,0,6.6c-1,2-3,3.2-4.1,5.1c-0.9,1.7-1,3.7-0.8,5.5 c0.1,1,0.4,2.1,1.3,2.5c0.4,0.2,0.8,0.1,1.3,0c1.8-0.4,3.1-1.8,4.3-3.2c1-1.2,1.9-2.4,2.7-3.6c0.4-0.6,0.8-1.2,1.4-1.6 c0.6-0.4,1.4-0.5,2.2-0.5c2.3,0,4.9,0.4,6.8-1c1.5-1.1,2.1-3,2.1-4.8c0-1.8-0.4-3.6-0.7-5.4c-0.1-0.8-0.2-1.6,0.4-2.2 c0.3-0.3,0.7-0.4,1-0.6c1.2-0.4,2.5-0.7,3.8-0.8"
					/>
					<line className="error-st2 run" x1="189.2" y1="63.1" x2="156.3" y2="110.4" />
					<path className="error-st2 run" d="M193,76c-0.3-0.1-12.6-0.2-12.6-0.2" />
					<line className="error-st2 run" x1="171.6" y1="88.4" x2="168.4" y2="75.6" />
					<path
						className="error-st7"
						d="M73,49.4c-1.9-4.2-1.1-5-2.8-7.6c-1.9-2.9-4.1-3.6-3.8-4.9c0.3-1.1,2.1-1.8,3.6-1.8 c6.3-0.2,14.1,11.5,11.3,17.3c-0.7,1.5-2.3,3-3.8,2.8C75.6,55.1,74.3,52.2,73,49.4z"
					/>
					<path className="error-st2 run" d="M76.5,44.3c0,0,1.6,0.7,1.8,10.8" />
					<path
						className="error-st7"
						d="M41.2,164.7c-2-6.9-3.8-7.1-4.3-12c-0.6-5.4,1.2-8.5-0.5-9.7c-1.4-1.1-4.4,0-6.1,1.4c-7.8,6.1-5.3,28.1,4,32.2 c2.3,1,5.7,1.3,7.4-0.4C43.8,174,42.5,169.3,41.2,164.7z"
					/>
					<path className="error-st2 run" d="M32,151c0,0-4.5,13.9,8.7,25.9" />
					<path
						className="error-st3 rotate"
						d="M121.2,88.3c0-0.7,0.4-1.3,1.1-1.7c-0.1-0.4-0.3-0.8-0.5-1.1c-0.7,0.2-1.3-0.1-1.8-0.6
c-0.5-0.5-0.7-1.1-0.5-1.8c-0.4-0.2-0.7-0.4-1.1-0.5c-0.4,0.7-1.1,1.1-1.8,1.1c-0.7,0-1.4-0.4-1.8-1.1c-0.4,0.1-0.8,0.3-1.1,0.5
c0.2,0.7,0,1.3-0.5,1.8c-0.5,0.5-1.1,0.8-1.8,0.6c-0.2,0.4-0.4,0.7-0.5,1.1c0.7,0.4,1.1,0.9,1.1,1.7c0,0.7-0.4,1.4-1.1,1.8
c0.1,0.4,0.3,0.8,0.5,1.1c0.7-0.2,1.3,0,1.8,0.5c0.5,0.5,0.7,1.1,0.5,1.8c0.4,0.2,0.7,0.4,1.1,0.5c0.4-0.7,1.1-1.1,1.8-1.1
c0.7,0,1.4,0.4,1.8,1.1c0.4-0.1,0.8-0.3,1.1-0.5c-0.2-0.7,0-1.3,0.5-1.8c0.5-0.5,1.1-0.8,1.8-0.6c0.2-0.4,0.4-0.7,0.5-1.1
C121.6,89.5,121.2,89,121.2,88.3 M116.6,90.2c-1.1,0-1.9-0.9-1.9-1.9c0-1.1,0.9-1.9,1.9-1.9c1.1,0,1.9,0.9,1.9,1.9
C118.5,89.4,117.7,90.2,116.6,90.2"
					/>
				</svg>
			</div>
		);
	}, []);

	const Icon = useMemo(() => {
		return (
			<div className="h-[100px] w-[100px] text-[0.5em] mb-5 rounded-[50%]">
				<a href={"/"}>
					{/* <img src={"/images/vnpt_logo.png"} alt="VNPT Logo" className="h-[100px] w-[100px]" /> */}
					{/* <AppIcon /> */}
				</a>
			</div>
		);
	}, []);

	return tryError ? null : (
		<div role="alert" className="bg-white dark:bg-backgroundDark h-full w-full">
			<div className="error-container">
				<div className="error-d-flex align-center flex-column">
					<div className="error-col-L">
						{Icon}

						<Typography.Title className="font-bold text-2xl uppercase">{"Đã xảy ra lỗi"}</Typography.Title>
						<br />
						<Typography.Title level={2}>
							Đây có thể là do lỗi kỹ thuật mà chúng tôi đang nỗ lực khắc phục. Hảy thử tải lại trang này.
						</Typography.Title>
						{/* <pre>{error.message}</pre> */}

						<Divider />
						<div className="flex w-full gap-4">
							<Button
								onClick={resetErrorBoundary}
								type="primary"
								className="h-[45px]"
								icon={<HomeOutlined />}
							>
								{"Về trang chủ"}
							</Button>

							<Button onClick={reloadPage} type="primary" className="h-[45px]" icon={<ReloadOutlined />}>
								{"Tải lại trang"}
							</Button>
						</div>
					</div>
					{PictureContent}
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
