import { Button as BaseButton } from '@headlessui/react';
import { ButtonProps } from './models';
import styles from './Button.module.css';
import { forwardRef } from 'react';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = 'default', size = 's', className, ...others }, ref) => (
		<BaseButton
			ref={ref}
			className={`${styles[`btn-${variant}`]} ${styles[size]} transition-all-300-ease-in-out ${className}`}
			{...others}
		>
			{children}
		</BaseButton>
	),
);

export { Button };
