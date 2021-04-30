const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'
const SET_REGISTRATION_ERROR = 'SET_REGISTRATION_ERROR'
const SET_SUCCESS_REGISTRATION = 'SET_SUCCESS_REGISTRATION'

const SET_SUCCESS_ADD_BOOK = 'SET_SUCCESS_ADD_BOOK'
const SET_ADD_BOOK_ERROR = 'SET_ADD_BOOK_ERROR'
const SET_SUCCESS_CHANGE_BOOK = 'SET_SUCCESS_CHANGE_BOOK'
const SET_CHANGE_BOOK_ERROR = 'SET_CHANGE_BOOK_ERROR'

const SET_SUCCESS_DELETE_BOOK = 'SET_SUCCESS_DELETE_BOOK'
const SET_DELETE_BOOK_ERROR = 'SET_DELETE_BOOK_ERROR'

const defaultState = {
	loginError: false,
	loginErrorText: '',
	registrationError: false,
	registrationErrorText: '',
	registrationErrorSuccess: false,
	registrationErrorSuccessText: '',
	addBookSuccess: false,
	addBookSuccessText: '',
	addBookError: false,
	addBookErrorText: '',
	changeBookSuccess: false,
	changeBookSuccessText: '',
	changeBookError: false,
	changeBookErrorText: '',
	deleteBookSuccess: false,
	deleteBookSuccessText: '',
	deleteBookError: false,
	deleteBookErrorText: ''
}

export default function errorReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_LOGIN_ERROR:
			return {
				...state,
				loginError: action.payload.error,
				loginErrorText: action.payload.text
			}

		case SET_REGISTRATION_ERROR:
			return {
				...state,
				registrationError: action.payload.error,
				registrationErrorText: action.payload.text
			}

		case SET_SUCCESS_REGISTRATION:
			return {
				...state,
				registrationErrorSuccess: action.payload.value,
				registrationErrorSuccessText: action.payload.text
			}

		case SET_SUCCESS_ADD_BOOK:
			return {
				...state,
				addBookSuccess: action.payload.value,
				addBookSuccessText: action.payload.text
			}

		case SET_ADD_BOOK_ERROR:
			return {
				...state,
				addBookError: action.payload.error,
				addBookErrorText: action.payload.text
			}

		case SET_SUCCESS_CHANGE_BOOK:
			return {
				...state,
				changeBookSuccess: action.payload.value,
				changeBookSuccessText: action.payload.text
			}

		case SET_CHANGE_BOOK_ERROR:
			return {
				...state,
				changeBookError: action.payload.error,
				changeBookErrorText: action.payload.text
			}

		case SET_SUCCESS_DELETE_BOOK:
			return {
				...state,
				deleteBookSuccess: action.payload.value,
				deleteBookSuccessText: action.payload.text
			}

		case SET_DELETE_BOOK_ERROR:
			return {
				...state,
				deleteBookError: action.payload.error,
				deleteBookErrorText: action.payload.text
			}

		default:
			return state
	}
}

export const setLoginError = (error, text) => ({ type: SET_LOGIN_ERROR, payload: { error, text } })
export const setRegistrationError = (error, text) => ({ type: SET_REGISTRATION_ERROR, payload: { error, text } })
export const setSuccessRegistration = (value, text) => ({ type: SET_SUCCESS_REGISTRATION, payload: { value, text } })

export const setAddBookSuccess = (value, text) => ({ type: SET_SUCCESS_ADD_BOOK, payload: { value, text } })
export const setAddBookError = (error, text) => ({ type: SET_ADD_BOOK_ERROR, payload: { error, text } })

export const setChangeBookSuccess = (value, text) => ({ type: SET_SUCCESS_CHANGE_BOOK, payload: { value, text } })
export const setChangeBookError = (error, text) => ({ type: SET_CHANGE_BOOK_ERROR, payload: { error, text } })

export const setDeleteBookSuccess = (value, text) => ({ type: SET_SUCCESS_DELETE_BOOK, payload: { value, text } })
export const setDeleteBookError = (error, text) => ({ type: SET_DELETE_BOOK_ERROR, payload: { error, text } })
