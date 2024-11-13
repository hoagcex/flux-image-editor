import { GeneratedImageT } from "@/model";
import { useGetListImages } from "@/network";
import { useSelectedImage } from "@/store";
import { cn } from "@/utils";
import { Typography } from "antd";
import { useShallow } from "zustand/react/shallow";

interface ImageListProps {}

export const ImageList = (props: ImageListProps) => {
	const { data } = useGetListImages({
		path: "",
		depth: 3,
		sortBy: "Name",
		sortReverse: false,
	});
	const [setImage] = useSelectedImage(useShallow((stt) => [stt.setImage]));

	return (
		<div
			className={cn(
				`border-[1px] border-solid border-[#d1d5db] dark:border-[#55585B]`,
				`focus-within:border-primaryColor dark:focus-within:border-primaryColor`,
				"max-h-[500px] overflow-y-scroll",
				"w-[calc(100% - 2rem)] p-4 flex flex-wrap flex-row gap-x-4",
			)}
		>
			{data?.files?.map((item, index) => {
				return <GeneratedImage key={index.toString()} item={item} setImage={setImage} />;
			})}
		</div>
	);
};

const GeneratedImage = ({ item, setImage }: { item: GeneratedImageT; setImage: (src: string) => void }) => {
	const handleClick = () => {
		setImage(encodeURI(import.meta.env.REACT_APP_BASE_URL + "View/local/" + item.src) + "?preview=true");
	};

	return (
		<div onClick={handleClick} className="w-36 relative">
			<img
				className="w-36 rounded-md"
				src={encodeURI(import.meta.env.REACT_APP_BASE_URL + "View/local/" + item.src) + "?preview=true"}
			/>
			<Typography.Text className="text-[10px]">{item.src}</Typography.Text>
			<div className="absolute top-1 right-1 text-white">☰</div>
		</div>
	);
};
