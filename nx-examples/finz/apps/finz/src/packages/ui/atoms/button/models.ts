import { Size, Variant } from '../../shared/models';
import { ButtonProps as BaseButtonProps } from '@headlessui/react';

interface ButtonProps extends Omit<BaseButtonProps, 'className'> {
	variant?: Variant;
	size?: Size;
	className?: string;
}

export type { ButtonProps };
