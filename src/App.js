/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from './contants/routes'

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));

function App() {
	return (
		<Router>
			<Suspense 
			fallback={
				<div className ="flex h-screen items-center justify-center">
					<img className="h-16 w-16" src="/images/instagramLogo.png" alt="logo"/>
				</div>}
			>
			<Switch>
				<Route path={ROUTES.LOGIN} component={Login} />
				<Route path={ROUTES.SIGN_UP} component={SignUp} />
			</Switch>
			</Suspense>
		</Router>
	)
	
}

export default App
