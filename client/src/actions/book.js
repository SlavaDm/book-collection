import axios from 'axios'
import { setAddBookSuccess, setAddBookError, setChangeBookSuccess, setChangeBookError, setDeleteBookSuccess, setDeleteBookError } from '../reducers/errorReducer'

export const addBookAction = (title, author, year, ISBN) => {
	return async dispatch => {
		try {
			const response = await axios.post(`http://localhost:5000/v1/book-collection/book/book`, {
				title,
				author,
				year,
				ISBN
			})

			dispatch(setAddBookSuccess(true, response?.data?.message))
			setTimeout(() => { dispatch(setAddBookSuccess(false, '')) }, 2000)
			dispatch(setAddBookError(false, ''))

		} catch (e) {
			dispatch(setAddBookSuccess(false, ''))
			dispatch(setAddBookError(true, e?.response?.data?.message))
			setTimeout(() => { dispatch(setAddBookError(false, '')) }, 2000)
		}
	}
}

export const changeBookAction = (book) => {
	return async dispatch => {
		try {
			const response = await axios.patch(`http://localhost:5000/v1/book-collection/book/book`, {
				data: book
			})

			dispatch(setChangeBookSuccess(true, response?.data?.message))
			setTimeout(() => { dispatch(setChangeBookSuccess(false, '')) }, 2000)
			dispatch(setChangeBookError(false, ''))

		} catch (e) {
			dispatch(setChangeBookSuccess(false, ''))
			dispatch(setChangeBookError(true, e?.response?.data?.message))
			setTimeout(() => { dispatch(setChangeBookError(false, '')) }, 2000)
		}
	}
}

export const deleteBookAction = (ISBN) => {
	return async dispatch => {
		try {
			const response = await axios.delete(`http://localhost:5000/v1/book-collection/book/book${ISBN}`)

			dispatch(setDeleteBookSuccess(true, response?.data?.message))
			setTimeout(() => { dispatch(setDeleteBookSuccess(false, '')) }, 2000)
			dispatch(setDeleteBookError(false, ''))

		} catch (e) {
			dispatch(setDeleteBookSuccess(false, e?.response?.data?.message))
			dispatch(setDeleteBookError(true, e?.response?.data?.message))
			setTimeout(() => { dispatch(setDeleteBookError(false, '')) }, 2000)
		}
	}
}
