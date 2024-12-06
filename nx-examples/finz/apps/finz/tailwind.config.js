const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		extend: {
			colors: {
				'color-primary': colors.teal[600],
				'color-primary-hover': colors.teal[700],
				'color-warning': colors.red[500],
				'color-alert': colors.red[700],
				'color-alert-hover': colors.red[800],
			},
			fontSize: {
				'2rem': '2rem',
			},
			lineHeight: {
				'3rem': '3rem',
			},
		},
	},
	plugins: [],
};
