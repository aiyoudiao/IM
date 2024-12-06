import { Label as BaseLabel, LabelProps as BaseLabelProps } from '@headlessui/react';

interface LabelProps extends Omit<BaseLabelProps, 'children'> {
	children: string;
}

const Label = ({ children, ...others }: LabelProps) => (
	<BaseLabel className={`font-sans text-sm font-normal leading-5`} {...others}>
		{children}
	</BaseLabel>
);

export { Label };
export type { LabelProps };
