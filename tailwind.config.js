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
			},
			black: {
				light: '#005c98',
				faded: '#00000059',
				dowload: '#262626',
				bold: '#262626'
			},
			gray: {
				base: '#616161',
				background: '#fafafa',
				primary: '#dbdbdb',
				graybold: '#8c8c8c',
			},
			red: {
				primary: '#ed4956',
			},
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
				}
			},
			animation: {
				mobileScreen: 'mobileScreen 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				scaletext: 'scaletext 0.5s cubic-bezier(1, 1, 0.2, 1)'
			},
			maxWidth:{
				maxwidth350: '350px',
				maxwidth258: '258px',
			},
			
		},
	},
}
