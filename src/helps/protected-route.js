/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../contants/routes'

export default function ProtectedRoute({ children, user, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user) {
					return children
				}
				if (!user) {
					return (
						<Redirect
							to={{
								pathname: ROUTES.LOGIN,
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
ProtectedRoute.propTypes = {
	user: PropTypes.object,
	children: PropTypes.object.isRequired,
}
