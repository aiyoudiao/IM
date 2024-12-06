import { DialogProvider } from './context';
import { Dialog, DialogProps } from './Dialog';
import type { Meta, StoryObj } from '@storybook/react';
import { DialogTypeList } from './models';
import { SizeList } from '../../shared/models';

const meta: Meta<typeof Dialog> = {
	component: Dialog,
	title: 'Organisms/Dialog',
	argTypes: {
		type: {
			options: DialogTypeList,
			control: { type: 'select' },
		},
		size: {
			options: SizeList,
			control: { type: 'select' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	args: {
		name: 'dialog',
		title: 'Dialog Title',
		description: 'Dialog Description',
		type: 'info',
	},
	render: (args: DialogProps) => (
		<DialogProvider states={{ dialog: true }}>
			<Dialog {...args} />
		</DialogProvider>
	),
};
