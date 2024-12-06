import type { Meta, StoryObj } from '@storybook/react';
import { Label, LabelProps } from './Label';
import { Field } from '@headlessui/react';

const meta: Meta<typeof Label> = {
	component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const LabelStory: Story = {
	name: 'Default',
	args: {
		children: 'Example Label',
	},
	render: (args: LabelProps) => (
		<Field>
			<Label {...args} />
		</Field>
	),
};
