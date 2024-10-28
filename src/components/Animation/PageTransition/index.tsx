import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type PageTransitionProps = React.HTMLAttributes<HTMLDivElement>;

const PageTransition = (props: PageTransitionProps) => {
	const { children, className } = props;
	return (
		<motion.div
			initial={{ opacity: 0.3 }}
			exit={{ opacity: 0.8 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className={twMerge(className)}
		>
			{children}
		</motion.div>
	);
};

export { PageTransition };
