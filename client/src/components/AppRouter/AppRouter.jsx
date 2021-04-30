import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Authorized from '../Authorized/Authorized'
import { auth } from '../../actions/auth'
import Loader from '../Loader/Loader'
import AddBook from '../AddBook/AddBook'
import ChangeBook from '../ChangeBook/ChangeBook'

const AppRouter = () => {
	const dispatch = useDispatch()
	
	const isAuth = useSelector(state => state.user.isAuth)
	const isLoading = useSelector(state => state.user.isLoading)
	const isAdmin = useSelector(state => state.user.currentUser.admin)

	useEffect(() => {
		dispatch(auth())
	}, [])

	if (isLoading) {
		return (<Loader />)
	}

	return isAuth && isAdmin ?
		(
			<Switch>
				<Route path='/collection' render={() => <Authorized />} />
				<Route path='/addBook' render={() => <AddBook />} />
				<Route path='/changeBook' render={() => <ChangeBook />} />
				<Redirect to='/collection' />
			</Switch >
		)
		:
		isAuth ?
			(
				<Switch>
					<Route path='/collection' render={() => <Authorized />} />
					<Redirect to='/collection' />
				</Switch >
			)
			:
			(
				<Switch>
					<Route path='/login' render={() => <Login />} />
					<Route path='/register' render={() => <Register />} />
					<Redirect to='/login' />
				</Switch >
			)
}

export default AppRouter
