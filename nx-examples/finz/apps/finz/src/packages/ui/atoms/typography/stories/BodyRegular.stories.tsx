import type { Meta, StoryObj } from '@storybook/react';
import { BodyRegular } from '../Typography';

const meta: Meta<typeof BodyRegular> = {
	component: BodyRegular,
	title: 'atoms/Typography',
};

export default meta;
type BodyRegularStory = StoryObj<typeof BodyRegular>;

export const BodyRegularStory: BodyRegularStory = {
	name: 'Body Regular',
	args: {
		children: 'Body Text',
	},
};
