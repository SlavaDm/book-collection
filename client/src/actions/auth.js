import axios from 'axios'
import { setUser, setLoading, logout } from '../reducers/userReducer'
import { setLoginError, setRegistrationError, setSuccessRegistration } from '../reducers/errorReducer'

axios.defaults.withCredentials = true

export const login = (login, password) => {
	return async dispatch => {
		try {
			const response = await axios.post(`http://localhost:5000/v1/book-collection/auth/login`, {
				login,
				password
			})

			dispatch(setUser(response?.data?.user))
			dispatch(setLoginError(false, ''))
		} catch (e) {
			dispatch(setLoginError(true, e?.response?.data?.message))
			setTimeout(() => { dispatch(setLoginError(false, '')) }, 2000)
		}
	}
}

export const signOut = () => {
	return async dispatch => {
		try {
			await axios.get(`http://localhost:5000/v1/book-collection/auth/signOut`)

			dispatch(logout())
		} catch (e) {
			console.log(e)
		}
	}
}

export const registration = (login, password, secretKey) => {
	return async dispatch => {
		try {
			const response = await axios.post(`http://localhost:5000/v1/book-collection/auth/registration`, {
				login,
				password,
				secretKey
			})

			dispatch(setRegistrationError(false, ''))
			dispatch(setSuccessRegistration(true, response.data?.message))
			setTimeout(() => { dispatch(setSuccessRegistration(false, '')) }, 2000)
			
			dispatch(auth())
		} catch (e) {
			dispatch(setRegistrationError(true, e?.response?.data?.message))
			setTimeout(() => { dispatch(setRegistrationError(false, '')) }, 2000)
			dispatch(setSuccessRegistration(false, ''))
		}
	}
}

export const auth = () => {
	return async dispatch => {
		try {
			const response = await axios.get(`http://localhost:5000/v1/book-collection/auth/auth`)

			dispatch(setLoading(false))
			dispatch(setUser(response.data.user))
			dispatch(setLoading(true))
		} catch (e) {
			dispatch(setLoading(false))
		}
	}
}
