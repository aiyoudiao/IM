import type { Meta, StoryObj } from '@storybook/react';
import { BodyBold } from '../Typography';

const meta: Meta<typeof BodyBold> = {
	component: BodyBold,
	title: 'atoms/Typography',
};

export default meta;
type BodyBoldStory = StoryObj<typeof BodyBold>;

export const BodyBoldStory: BodyBoldStory = {
	name: 'Body Bold',
	args: {
		children: 'Body Text',
	},
};
