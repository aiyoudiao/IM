import type { Meta, StoryObj } from '@storybook/react';
import { VariantList } from '../../../shared/models';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
	component: Button,
	argTypes: {
		variant: {
			options: VariantList,
			control: { type: 'select' },
		},
	},
	title: 'atoms/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
	name: 'Button',
	args: {
		title: 'Click Me',
		variant: 'primary',
		children: 'Click Me',
	},
};
