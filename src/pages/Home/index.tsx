import { AppSpinner, ImageGen, MaskEditor, PageWrapper } from "@/components";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");
const Home = () => {
	return (
		<PageWrapper>
			{false ? <AppSpinner fullscreen /> : <ImageGen socket={socket} />}
			<MaskEditor socket={socket} />
		</PageWrapper>
	);
};
export default Home;
