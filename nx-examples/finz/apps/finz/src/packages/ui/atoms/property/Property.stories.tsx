import type { Meta, StoryObj } from '@storybook/react';
import { Property } from './Property';
import { PropertyState, PropertyStateList } from '@finz/lib';

const meta: Meta<typeof Property> = {
	component: Property,
	argTypes: {
		state: {
			options: PropertyStateList as readonly PropertyState[],
			control: { type: 'select' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Property>;

export const Default: Story = {
	args: {
		name: 'Property 1',
		state: 'committed',
	},
};
