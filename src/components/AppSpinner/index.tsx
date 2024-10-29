import { memo } from "react";
import "./index.css";
import { Spin, SpinProps } from "antd";

interface AppSpinnerprops extends SpinProps {}

const AppSpinner = memo((props: AppSpinnerprops) => {
	// useEffect(() => {
	// 	NProgress.start();

	// 	return () => {
	// 		NProgress.done();
	// 	};
	// });
	return (
		<div className="h-full w-full flex items-center justify-center">
			<Spin {...props} />
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
