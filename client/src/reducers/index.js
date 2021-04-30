import thunk from 'redux-thunk'
import userReducer from './userReducer'
import errorReducer from './errorReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
	user: userReducer,
	error: errorReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
