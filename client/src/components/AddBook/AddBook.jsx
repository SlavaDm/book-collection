import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input/Input'
import { isValidISBN } from '../isISBN'
import { addBookAction } from '../../actions/book'
import s from '../Form.module.scss'

const AddBook = () => {
	const dispatch = useDispatch()
	
	const addBookSuccess = useSelector(state => state.error.addBookSuccess)
	const addBookSuccessText = useSelector(state => state.error.addBookSuccessText)

	const addBookError = useSelector(state => state.error.addBookError)
	const addBookErrorText = useSelector(state => state.error.addBookErrorText)

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

	useEffect(() => {
		document.title = 'Add Book'
	}, [])

	const buttonHandler = (title, author, year, ISBN) => {
		if (title.length && author.length && (year.length > 0 && year.length <= 4) && ISBN.length) {
			if (isValidISBN(ISBN)) {
				if (!isNaN(year)) {
					dispatch(addBookAction(title, author, year, ISBN))
					setTitle('')
					setAuthor('')
					setYear('')
					setISBN('')
				} else {
					setIsValidISBNError(true)
					setIsValidISBNErrorText('Year must be number')
					setTimeout(() => {
						setIsValidISBNError(false)
						setIsValidISBNErrorText('')
					}, 2000)
				}

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

	return (
		<div className={s.form}>
			<div className={s.border}>
				<div>Add a book</div>
				<Input type='text' value={title} onChange={titleHandler} placeholder='title' />
				<Input type='text' value={author} onChange={authorHandler} placeholder='author' />
				<Input type='text' value={year} onChange={yearHandler} placeholder='year' />
				<Input type='text' value={ISBN} onChange={ISBNHandler} placeholder='ISBN' />
				<div className={s.button}>
					<button onClick={() => { buttonHandler(title, author, year, ISBN) }}>Add</button>
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
				addBookError &&
				(<div className={s.form__error}>{addBookErrorText}</div>)
			}
			{
				addBookSuccess &&
				(<div className={s.form__success}>{addBookSuccessText}</div>)
			}
		</div>
	)
}

export default AddBook
