import { GeneratedImageT } from "@/model";
import { useGetListImages } from "@/network";
import { useSelectedImage } from "@/store";
import { cn } from "@/utils";
import { EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Typography } from "antd";
import { BiTrash } from "react-icons/bi";
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

const items: MenuProps["items"] = [
	{
		label: "Delete",
		key: "delete",
		icon: <BiTrash />,
	},
	{
		label: "Edit mask",
		key: "edit",
		icon: <EditOutlined />,
	},
];
const GeneratedImage = ({ item, setImage }: { item: GeneratedImageT; setImage: (src: string) => void }) => {
	const handleClick = () => {
		setImage(encodeURI(import.meta.env.REACT_APP_BASE_URL + "View/local/" + item.src) + "?preview=true");
	};
	const handleMenuClick: MenuProps["onClick"] = (e) => {
		if (e.key === "edit") {
			handleClick();
			return;
		}
	};

	return (
		<div className="w-36 relative">
			<img
				className="w-36 rounded-md"
				src={encodeURI(import.meta.env.REACT_APP_BASE_URL + "View/local/" + item.src) + "?preview=true"}
			/>
			<Typography.Text className="text-[10px]">{item.src}</Typography.Text>
			<Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomLeft" trigger={["click"]}>
				<Button className="absolute top-0 right-0 text-white cursor-pointer" variant="text" color="default">
					☰
				</Button>
			</Dropdown>
		</div>
	);
};
