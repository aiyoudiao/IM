import type { Meta, StoryObj } from '@storybook/react';
import { SideMenuItem } from './SideMenuItem';

const meta: Meta<typeof SideMenuItem> = {
	title: 'Molecules/SideMenuItem',
	component: SideMenuItem,
};

export default meta;
type Story = StoryObj<typeof SideMenuItem>;

export const Default: Story = {
	args: {
		id: '72f32def-df1c-4e93-9e48-b5927d92dc97',
		name: 'Project 1',
		actions: [
			{
				name: 'Rename',
				onClick: () => {
					console.log('Project 1');
				},
			},

			{
				name: 'Delete',
				onClick: () => {
					console.log('Deleted');
				},
				variant: 'warn',
			},
		],
	},
};
