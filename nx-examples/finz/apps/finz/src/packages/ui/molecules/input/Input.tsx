import { Field, Input as BaseInput, InputProps as BaseInputProps } from '@headlessui/react';
import clsx from 'clsx';
import { Label } from '../../atoms/label/Label';
import { forwardRef } from 'react';
import { FieldError } from '../../atoms/FieldError/FieldError';

interface InputProps extends Omit<BaseInputProps, 'name'> {
	name: string;
	label?: string;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...others }, ref) => {
	return (
		<Field className="w-full flex flex-col gap-2">
			{label && <Label>{label}</Label>}
			<BaseInput
				className={clsx(
					'block w-full rounded-lg border border-solid border-white bg-gray-100 p-3 text-sm outline-none',
					'hover:bg-white hover:border hover:border-solid hover:border-teal-600',
					'focus:bg-white focus:border focus:border-solid focus:border-teal-600 focus:outline-none',
					'-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
					'transition-all-300-ease-in-out',
				)}
				ref={ref}
				{...others}
			/>
			<FieldError error={error} />
		</Field>
	);
});

export { Input };
