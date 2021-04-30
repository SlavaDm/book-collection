import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { registration as registrationAction } from '../../actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../Input/Input'
import s from '../Form.module.scss'

const Register = () => {
	const dispatch = useDispatch()

	const registrationError = useSelector(state => state.error.registrationError)
	const registrationErrorText = useSelector(state => state.error.registrationErrorText)

	const registrationErrorSuccess = useSelector(state => state.error.registrationErrorSuccess)
	const registrationErrorSuccessText = useSelector(state => state.error.registrationErrorSuccessText)

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [secretKey, setSecretKey] = useState(null)

	const loginHandler = (event) => {
		setLogin(event.target.value.trim())
	}

	const passwordHandler = (event) => {
		setPassword(event.target.value.trim())
	}

	const secretKeyHandler = (event) => {
		setSecretKey(event.target.value.trim())
	}

	const buttonHandler = (login, password, secretKey) => {
		dispatch(registrationAction(login, password, secretKey))
	}

	useEffect(() => {
		document.title = 'Sign up'
	}, [])

	return (
		<>
			<div className={s.form}>
				<div className={s.border}>
					<Input type={'text'} value={login} onChange={loginHandler} placeholder={'login'} />
					<Input type={'password'} value={password} onChange={passwordHandler} placeholder={'password'} />
					<Input type={'text'} value={secretKey} onChange={secretKeyHandler} placeholder={'secret key (123)'} />
					<div className={s.button}>
						<button onClick={() => buttonHandler(login, password, secretKey)}>Sign up</button>
					</div>
				</div>
				{
					registrationError &&
					(<div className={s.form__error}>{registrationErrorText}</div>)
				}
				{
					registrationErrorSuccess &&
					(<div className={s.form__success}>{registrationErrorSuccessText}</div>)
				}
				<div className={s.info}>
					Do you have an account?<NavLink to='/login'>Sign in</NavLink>
				</div>
			</div>
		</>
	)
}

export default Register
