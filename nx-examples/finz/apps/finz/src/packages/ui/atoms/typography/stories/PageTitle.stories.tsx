import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from '../Typography';

const meta: Meta<typeof PageTitle> = {
	component: PageTitle,
	title: 'atoms/Typography',
};

export default meta;
type PageTitleStory = StoryObj<typeof PageTitle>;

export const PageTitleStory: PageTitleStory = {
	name: 'Page Title',
	args: {
		children: 'Title',
	},
};
