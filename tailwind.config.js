/* eslint-disable prettier/prettier */
// tailwind.config.js
module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	theme: {
		fill: (theme) => ({
			red: theme('colors.red.primary'),
		}),
		colors: {
			white: '#ffffff',
			blue: {
				medium: '#0095f6',
				bold: '#385185',
				light: '#03afd6',
			},
			black: {
				light: '#262626',
				faded: '#00000059',
				dowload: '#262626',
				bold: '#2d2d2d'
			},
			gray: {
				base: '#616161',
				background: '#fafafa',
				primary: '#dbdbdb',
				graybold: '#8c8c8c',
				graysemibold: '#c7c7c7',
				graysuggeseted: '#8e8e8e'
			},
			red: {
				primary: '#ed4956',
				light: '#ff8c8c'
			},
			linear: {
				lineargradient: 'linear-gradient(to right, red, purple)'
			}
		},

	
		extend: {
			keyframes: {
				mobileScreen: {
					'0%, 100%': {
						opacity: '1',
					},
					'50%': {
						opacity: '.5',
					},
				},
				scaletext: {
					'0%': {
						transform: 'scale(.5)',
						opacity: '0'
					},
					'75%': {
						transform: 'scale(1.0)',
						opacity: '.5'
					},
					'100%': {
						transform: 'scale(1.0)'
					}
				},
			
			},
			inset: {
				'88px':'5.5rem'
			},
			animation: {
				mobileScreen: 'mobileScreen 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				scaletext: 'scaletext 0.5s cubic-bezier(1, 1, 0.2, 1)'
			},
			maxWidth:{
				maxwidth350: '380px',
				maxwidth258: '258px',
			},
			minWidth:{
				minwidth215: '230px'
			},
			width:{
				'88-percent': '88%'
			},
			
		},
	},
}
