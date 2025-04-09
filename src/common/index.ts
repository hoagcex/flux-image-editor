import { ImageTemplate } from "@/model";

export * from "./QueryParams";
export * from "./RoutePath";
export * from "./Theme";

export const ImageSize: ImageTemplate[] = [
	{
		name: "test",
		width: 128,
		height: 128,
		description: "Test image",
	},
	{
		name: "facebookCover",
		width: 820,
		height: 312,
		description: "Ảnh bìa fanpage",
	},
	{
		name: "zaloCover",
		width: 1000,
		height: 500,
		description: "Ảnh bìa Zalo cá nhân",
	},
	{
		name: "instagramPost",
		width: 1080,
		height: 1080,
		description: "Ảnh vuông cho bài post Instagram",
	},
	{
		name: "tiktokThumb",
		width: 1080,
		height: 1920,
		description: "Thumbnail dọc cho TikTok video",
	},
	{
		name: "linkedinBanner",
		width: 1128,
		height: 191,
		description: "Ảnh banner cá nhân LinkedIn",
	},
	{
		name: "youtubeThumbnail",
		width: 1280,
		height: 720,
		description: "Thumbnail video YouTube",
	},
	{
		name: "twitterPost",
		width: 1200,
		height: 675,
		description: "Ảnh chia sẻ trên Twitter",
	},
];
