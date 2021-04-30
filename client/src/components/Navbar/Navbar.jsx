/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../actions/auth'
import s from './Navbar.module.scss'

const Navbar = () => {
	const dispatch = useDispatch()

	const isAuth = useSelector(state => state.user.isAuth)
	const isAdmin = useSelector(state => state.user.currentUser.admin)
	
	const logoutHandler = () => {
		dispatch(signOut())
	}

	return (
		<nav className={s.header}>
			<div className={s.wrapper}>
				<div className={s.header__logo}>

					<div className={s.header__img}>
						<img src='https://christjesus.ru/files/2017/06/books-2379396_1920.png' alt='' />
					</div>
					<div className={s.header__text}><NavLink to='/login'>book collection</NavLink></div>

				</div>
				<div className={s.header__auth}>
					{isAuth ?
						(
							<>
								{isAdmin &&
									(
										<>
											<NavLink to='/addBook'>
												AddBook
											</NavLink>
											<NavLink to='/changeBook'>
												ChangeBook
											</NavLink>
										</>
									)
								}
								<a onClick={logoutHandler}>
									SignOut
								</a>
							</>
						)
						:
						(
							<NavLink to='/login'>
								SignIn
							</NavLink>
						)
					}
				</div>
			</div>
		</nav >
	)
}

export default Navbar
