import { memo } from "react";
import "./index.css";
import { Spin } from "antd";

const AppSpinner = memo(() => {
	// useEffect(() => {
	// 	NProgress.start();

	// 	return () => {
	// 		NProgress.done();
	// 	};
	// });
	return (
		<div className="h-full w-full flex items-center justify-center">
			<Spin />
			{/* <div className="lcontainer">
				<div className="slice"></div>
				<div className="slice"></div>
				<div className="slice"></div>
				<div className="slice"></div>
				<div className="slice"></div>
				<div className="slice"></div>
			</div> */}
		</div>
	);
});

export { AppSpinner };
