/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './contants/routes'

const Login = lazy(() => import('./pages/login'));

function App() {
	return (
		<Router>
			<Suspense fallback={<p>Loading....</p>}>
			<Switch>
				<Route path={ROUTES.LOGIN} component={Login} />
			</Switch>
			</Suspense>
		</Router>
	)
	
}

export default App
