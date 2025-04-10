import { useImagesTemplate } from "@/store";
import { Image, Typography } from "antd";
import { useShallow } from "zustand/react/shallow";
import { AntdCard } from "../Wrapper";
import { isEmpty } from "lodash";

export const ImageTemplateList = () => {
	const [images] = useImagesTemplate(useShallow((stt) => [stt.images]));
	return isEmpty(images) ? undefined : (
		<AntdCard className="mt-8">
			<div className="flex flex-row gap-x-2">
				<Image.PreviewGroup>
					{images?.map((item) => (
						<div className="flex flex-col" key={item.name}>
							<Typography.Text>{item.description}</Typography.Text>
							<Typography.Text className="italic">
								({item.width} x {item.height})
							</Typography.Text>
							<Image src={item.imageSrc} width={200} className="mt-2" />
						</div>
					))}
				</Image.PreviewGroup>
			</div>
		</AntdCard>
	);
};
