import type { Meta, StoryObj } from '@storybook/react';
import { SizeList, VariantList } from '../../../shared/models';
import { IconButton } from '../IconButton';
import { SquareAdd } from '../../icon/Icons';

const meta: Meta<typeof IconButton> = {
	component: IconButton,
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
	title: 'atoms/Button',
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const IconButtonStory: Story = {
	name: 'Icon Button',
	args: {
		title: 'add',
		variant: 'primary',
		size: 'm',
		children: <SquareAdd />,
	},
};
