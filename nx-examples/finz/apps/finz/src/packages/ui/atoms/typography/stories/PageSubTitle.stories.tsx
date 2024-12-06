import type { Meta, StoryObj } from '@storybook/react';
import { PageSubTitle } from '../Typography';

const meta: Meta<typeof PageSubTitle> = {
	component: PageSubTitle,
	title: 'atoms/Typography',
};

export default meta;
type PageSubTitleStory = StoryObj<typeof PageSubTitle>;

export const PageSubTitleStory: PageSubTitleStory = {
	name: 'Page Secondary Title',
	args: {
		children: 'Title',
	},
};
