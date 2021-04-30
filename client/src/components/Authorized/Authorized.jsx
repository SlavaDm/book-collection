import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../../base'
import Loader from '../Loader/Loader'
import { deleteBookAction } from '../../actions/book'
import s from './Authorized.module.scss'

function Authorized() {
	const dispatch = useDispatch()
	
	const user = useSelector(state => state.user.currentUser)
	const [books, loading] = useCollectionData(
		firestore.collection('books')
	)

	const number = books?.length % 3 || 0
	
	const fillArray = Array(3 - number).fill({})
	
	const buttonHandler = (ISBN) => {
		dispatch(deleteBookAction(ISBN))
	}

	useEffect(() => {
		document.title = 'Book Collection'
	}, [])
	
	if (loading) {
		return (<Loader />)
	}

	return (
		<div className={s.box}>
			{ books?.length ? books.map(book => {
				return (
					<div className={s.book} key={book.ISBN}>
						<div className={s.contain}>
							<div className={s.item}>title: {book.title}</div>
							<div className={s.item}>author: {book.author}</div>
							<div className={s.item}>year: {book.year}</div>
							<div className={s.item}>ISBN: {book.ISBN}</div>
							{user.admin && (
								<button onClick={() => buttonHandler(book.ISBN)}><img src='http://cdn.onlinewebfonts.com/svg/download_229056.png' alt='' /></button>
							)}
						</div>
					</div>
				)
			}
			)
				:
				(<div>0 books in the collection</div>)
			}
			{
				fillArray?.length !== 3 &&
				fillArray.map(_ => {
					return (
						<div className={`${s.book} ${s.nothing}`} key={Date.now()}>
						</div>
					)
				}
				)
			}
		</div>
	)
}

export default Authorized
