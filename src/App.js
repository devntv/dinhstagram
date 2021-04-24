/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from './contants/routes'
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';


const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));
const ViewAllSuggested = lazy(()=> import('./components/sidebar/view-allSuggessted'))

export default function App() {
	const { user } = useAuthListener()
	return (
		<UserContext.Provider value={{ user }}>
		<Router>
			<Suspense 
			fallback={
				<div className ="flex h-screen items-center justify-center">
					<img className="h-16 w-16" src="/images/instagramLogo.png" alt="logo"/>
				</div>}
			>
			<Switch>
				<Route path={ROUTES.LOGIN} component={Login}  />
				<Route path={ROUTES.SIGN_UP} component={SignUp} />
				<Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
				<Route path={ROUTES.VIEW_ALLSUGGESTION} component={ViewAllSuggested}/>
				<Route component={NotFound} />
			</Switch>
			</Suspense>
		</Router>
		</UserContext.Provider>
	)
	
}


