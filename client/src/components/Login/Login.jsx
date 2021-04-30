import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login as loginAction } from '../../actions/auth'
import Input from '../Input/Input'
import s from '../Form.module.scss'


const Login = () => {
	const dispatch = useDispatch()

	const loginError = useSelector(state => state.error.loginError)
	const loginErrorText = useSelector(state => state.error.loginErrorText)

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const loginHandler = (event) => {
		setLogin(event.target.value.trim())
	}

	const passwordHandler = (event) => {
		setPassword(event.target.value.trim())
	}

	const buttonHandler = (login, password) => {
		dispatch(loginAction(login, password))
	}

	useEffect(() => {
		document.title = 'Sign in'
	}, [])

	return (
		<>
			<div className={s.form}>
				<div className={s.border}>
					<Input type='text' value={login} onChange={loginHandler} placeholder={'login'} />
					<Input type='password' value={password} onChange={passwordHandler} placeholder={'password'} />
					<div className={s.button}>
						<button onClick={() => buttonHandler(login, password)}>Sign in</button>
					</div>
				</div>
				{
					loginError &&
					(<div className={s.form__error}>{loginErrorText}</div>)
				}
				<div className={s.info}>
					Don't have an account yet?<NavLink to='/register'>Sign up</NavLink>
				</div>
			</div>
		</>
	)
}

export default Login
