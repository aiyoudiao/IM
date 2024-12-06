import type { Meta, StoryObj } from '@storybook/react';
import { SquareAdd } from '../Icons';
import { SizeList, VariantList } from '../../../shared/models';

const meta: Meta<typeof SquareAdd> = {
	component: SquareAdd,
	argTypes: {
		variant: {
			options: VariantList,
			control: { type: 'select' },
		},
		size: {
			options: SizeList,
			control: { type: 'select' },
		},
	},
	title: 'atoms/Icon',
};

export default meta;
type Story = StoryObj<typeof SquareAdd>;

export const Default: Story = {
	name: 'Square Add',
	args: {
		variant: 'primary',
		size: 'l',
	},
};
