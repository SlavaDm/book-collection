const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const SET_LOADING = 'SET_LOADING'

const defaultState = {
	currentUser: {},
	isAuth: false,
	isLoading: true
}

export default function userReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				currentUser: action.payload,
				isAuth: true
			}
		case LOGOUT:
			return {
				...state,
				currentUser: {},
				isAuth: false
			}
		case SET_LOADING:
			return {
				...state,
				isLoading: action.payload.value
			}
		default:
			return state
	}
}

export const setUser = user => ({ type: SET_USER, payload: user })
export const setLoading = value => ({ type: SET_LOADING, payload: value })
export const logout = () => ({ type: LOGOUT })
