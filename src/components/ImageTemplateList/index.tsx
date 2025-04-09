import { useImagesTemplate } from "@/store";
import { Image, Typography } from "antd";
import { useShallow } from "zustand/react/shallow";

export const ImageTemplateList = () => {
	const [images] = useImagesTemplate(useShallow((stt) => [stt.images]));
	return (
		<div className="flex flex-col gap-y-2">
			<Image.PreviewGroup>
				{/* <Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
				<Image width={200} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" /> */}
				{images?.map((item) => (
					<Image
						src={item.imageSrc}
						width={200}
						// height={item.height}
						// style={{
						//   width: item.width,
						//   height: item.height,
						// }}
					/>
				))}
				<>{/* <Typography.Text>{item.description}</Typography.Text> */}</>
			</Image.PreviewGroup>
		</div>
	);
};
