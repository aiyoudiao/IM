import { Meta, StoryObj } from '@storybook/react';
import { FieldError } from './FieldError';

const meta: Meta<typeof FieldError> = {
	title: 'Atoms/FieldError',
	component: FieldError,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FieldError>;

export const Default: Story = {
	args: {
		error: 'This field is required',
	},
};
