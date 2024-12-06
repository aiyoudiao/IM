import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from '../Typography';

const meta: Meta<typeof SectionTitle> = {
	component: SectionTitle,
	title: 'atoms/Typography',
};

export default meta;
type SectionTitleStory = StoryObj<typeof SectionTitle>;

export const SectionTitleStory: SectionTitleStory = {
	name: 'Section Title',
	args: {
		children: 'Title',
	},
};
