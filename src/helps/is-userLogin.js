/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export default function IsUserLoggedIn({
	children,
	loggedInPath,
	user,
	...rest
}) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (!user) {
					return children
				}
				if (user) {
					return (
						<Redirect
							to={{
								pathname: loggedInPath,
								state: { from: location },
							}}
						/>
					)
				}
				return null
			}}
		/>
	)
}
IsUserLoggedIn.propTypes = {
	user: PropTypes.object,
	children: PropTypes.object.isRequired,
	loggedInPath: PropTypes.string.isRequired,
}
