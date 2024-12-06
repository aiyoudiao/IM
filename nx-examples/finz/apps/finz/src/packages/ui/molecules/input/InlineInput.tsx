import { Input as BaseInput, InputProps as BaseInputProps } from '@headlessui/react';
import { forwardRef } from 'react';

interface InlineInputProps extends Omit<BaseInputProps, 'name'> {
	name: string;
	error?: string;
}

export const InlineInput = forwardRef<HTMLInputElement, InlineInputProps>(({ error, ...others }, ref) => (
	<BaseInput className="w-full rounded-sm bg-green-50 p-1 text-sm outline-none" ref={ref} {...others} />
));
