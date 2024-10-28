import { PageWrapper } from "@/components";
import { useGetNewSession } from "@/network";
import { useEffect } from "react";

const Home = () => {
	const { mutateAsync: getNewSession } = useGetNewSession();

	useEffect(() => {
		getNewSession()
			.then((res) => {
				console.log("res", res);
			})
			.catch((error) => {
				console.log("error", error);
			});
	}, []);

	return <PageWrapper title={"Home"}></PageWrapper>;
};
export default Home;
