import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input/Input'
import { isValidISBN } from '../isISBN'
import { changeBookAction } from '../../actions/book'
import s from '../Form.module.scss'

const ChangeBook = () => {
	const dispatch = useDispatch()

	const changeBookSuccess = useSelector(state => state.error.changeBookSuccess)
	const changeBookSuccessText = useSelector(state => state.error.changeBookSuccessText)

	const changeBookError = useSelector(state => state.error.changeBookError)
	const changeBookErrorText = useSelector(state => state.error.changeBookErrorText)

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [year, setYear] = useState('')
	const [ISBN, setISBN] = useState('')

	const [inputError, setInputError] = useState(false)
	const [inputErrorText, setInputErrorText] = useState('')

	const [isValidISBNError, setIsValidISBNError] = useState(false)
	const [isValidISBNErrorText, setIsValidISBNErrorText] = useState('')

	const titleHandler = (event) => {
		setTitle(event.target.value)
	}

	const authorHandler = (event) => {
		setAuthor(event.target.value)
	}

	const yearHandler = (event) => {
		setYear(event.target.value)
	}

	const ISBNHandler = (event) => {
		setISBN(event.target.value)
	}

	const buttonHandler = (title, author, year, ISBN) => {
		if (ISBN.length && (author.length || (year.length > 0 && year.length <= 4) || title.length)) {
			if (isValidISBN(ISBN)) {
				dispatch(changeBookAction({ book: { title, author, year, ISBN } }))
				setTitle('')
				setAuthor('')
				setYear('')
				setISBN('')
			} else {
				setIsValidISBNError(true)
				setIsValidISBNErrorText('Invalid ISBN')
				setTimeout(() => {
					setIsValidISBNError(false)
					setIsValidISBNErrorText('')
				}, 2000)
			}
		} else {
			setInputError(true)
			setInputErrorText('Incorrect input')
			setTimeout(() => {
				setInputError(false)
				setInputErrorText('')
			}, 2000)
		}
	}

	useEffect(() => {
		document.title = 'Change Book'
	}, [])

	return (
		<div className={s.form}>
			<div className={s.border}>
				<div>Change the book</div>
				<Input type='text' value={ISBN} onChange={ISBNHandler} placeholder='ISBN' />
				<Input type='text' value={title} onChange={titleHandler} placeholder='title' />
				<Input type='text' value={author} onChange={authorHandler} placeholder='author' />
				<Input type='text' value={year} onChange={yearHandler} placeholder='year' />
				<div className={s.button}>
					<button onClick={() => { buttonHandler(title, author, year, ISBN) }}>Change</button>
				</div>
			</div>
			{
				inputError &&
				(<div className={s.form__error}>{inputErrorText}</div>)
			}
			{
				isValidISBNError &&
				(<div className={s.form__error}>{isValidISBNErrorText}</div>)
			}
			{
				changeBookError &&
				(<div className={s.form__error}>{changeBookErrorText}</div>)
			}
			{
				changeBookSuccess &&
				(<div className={s.form__success}>{changeBookSuccessText}</div>)
			}
		</div>
	)
}

export default ChangeBook
