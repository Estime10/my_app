/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/flowbite/**/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				equinox: ['Equinox', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('tailwind-scrollbar-hide'),
		require('tailwind-scrollbar'),
		require('flowbite/plugin'),
	],
}
