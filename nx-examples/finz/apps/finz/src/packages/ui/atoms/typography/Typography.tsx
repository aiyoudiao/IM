interface TypographyProps extends Omit<React.ComponentProps<'div'>, 'children'> {
	children: string;
}
const baseCommonClasses = 'font-sans';

const PageTitle = ({ children, className, ...other }: TypographyProps) => (
	<div className={`${baseCommonClasses} text-2rem font-bold leading-3rem ${className}`} {...other}>
		{children}
	</div>
);

const PageSubTitle = ({ children, className, ...other }: TypographyProps) => (
	<div className={`${baseCommonClasses} text-2xl font-bold leading-8 ${className}`} {...other}>
		{children}
	</div>
);

const SectionTitle = ({ children, className, ...other }: TypographyProps) => (
	<div className={`${baseCommonClasses} text-lg font-bold leading-7 ${className}`} {...other}>
		{children}
	</div>
);

const BodyRegular = ({ children, className, ...other }: TypographyProps) => (
	<div className={`${baseCommonClasses} text-sm font-normal leading-5 ${className}`} {...other}>
		{children}
	</div>
);

const BodyBold = ({ children, className, ...other }: TypographyProps) => (
	<div className={`${baseCommonClasses} text-sm font-bold leading-5 ${className}`} {...other}>
		{children}
	</div>
);

export { PageTitle, PageSubTitle, SectionTitle, BodyRegular, BodyBold };
