/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { lazy, Profiler, Suspense } from 'react'
import './app.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from './contants/routes'
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helps/protected-route'
import IsUserLoggedIn from './helps/is-userLogin'

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const ViewAllSuggested = lazy(()=> import('./components/sidebar/view-allSuggessted'))
const Proifile  = lazy(()=> import('./pages/profile'))
const NotFound = lazy(() => import('./pages/not-found'));

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
				<IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
					{/* <Route path={ROUTES.LOGIN} component={Login}  /> */}
					<Login />
				</IsUserLoggedIn>
				<IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
					{/* <Route path={ROUTES.SIGN_UP} component={SignUp} /> */}
					<SignUp />
				</IsUserLoggedIn>
				<Route path={ROUTES.PROFILE} component={Proifile} />
				<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
					{/* <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/> */}
					<Dashboard />
				</ProtectedRoute>
				<Route path={ROUTES.VIEW_ALLSUGGESTION} component={ViewAllSuggested}/>
				<Route component={NotFound} />
			</Switch>
			</Suspense>
		</Router>
		</UserContext.Provider>
	)
	
}


