import { PageTransition } from "@/components";
import { useDocumentTitle } from "@/hook";
import { Breadcrumb, Typography } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { isEmpty } from "lodash";
import { twMerge } from "tailwind-merge";

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	subTitle?: string;
	breadcrumb?: ItemType[];
}

const PageWrapper = (props: PageWrapperProps) => {
	const { title = "", subTitle = "", children, className, breadcrumb } = props;
	useDocumentTitle(title);
	return (
		<PageTransition className="pt-4 px-8 pb-20 w-full gap-y-4 flex flex-col">
			{isEmpty(title) && isEmpty(subTitle) ? null : (
				<div
					className="bg-backgroundPageHeader dark:bg-backgroundPageHeaderDark pt-3 pb-4 px-5"
					style={{
						borderRadius: 4,
					}}
				>
					{isEmpty(breadcrumb) ? undefined : (
						<div className="w-full">
							<Breadcrumb separator=">" items={breadcrumb} />
						</div>
					)}
					<div>
						{isEmpty(title) ? null : (
							<Typography.Title level={3} className="mt-3" style={{ marginBottom: 8 }}>
								{title}
							</Typography.Title>
						)}
						{isEmpty(subTitle) ? null : (
							<Typography.Paragraph className="text-base italic">{subTitle}</Typography.Paragraph>
						)}
					</div>
				</div>
			)}
			<div
				className={twMerge(
					"w-full min-h-screen bg-background dark:bg-backgroundPageHeaderDark/60 p-5",
					className,
				)}
				style={{
					borderRadius: 4,
				}}
			>
				{children}
			</div>
		</PageTransition>
	);
};

export { PageWrapper };
