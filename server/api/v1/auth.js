const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../../middleware/auth.middleware.js')
const config = require('config')
const SECRET_KEY = config.get('SECRET_KEY')
const SECRET_ADMIN_KEY = config.get('SECRET_ADMIN_KEY')
const { firestore } = require('../../base')

router.post('/login',
	async (req, res) => {
		try {
			const { login, password } = req.body

			const users = firestore.collection('users')
				.where('login', '==', login)

			const getUsers = await users.get()

			const arrayFromUsers = getUsers.docs.map(doc => {
				return doc.data()
			})

			if (!arrayFromUsers.length) {
				return res.status(404).json({ message: 'User not found' })
			}

			const isPassValid = bcrypt.compareSync(password, arrayFromUsers[0].password)

			if (!isPassValid) {
				return res.status(400).json({ message: 'Invalid password' })
			}

			const token = jwt.sign({ login: arrayFromUsers[0].login, admin: arrayFromUsers[0].admin }, SECRET_KEY, { expiresIn: '24h' })

			return res
				.status(200)
				.cookie('token', `Bearer ${token}`, {
					sameSite: 'strict',
					path: '/',
					expires: new Date(new Date().getTime() + 86400000),
					httpOnly: true,
					secure: true
				})
				.json({
					token,
					user: {
						login: arrayFromUsers[0].login,
						admin: arrayFromUsers[0].admin
					}
				})
		} catch (e) {
			res
				.status(500)
				.send({ message: 'Server error' })
		}
	})

router.get('/signOut',
	async (req, res) => {
		try {
			return res
				.status(200)
				.clearCookie('token')
				.send('OK')
		} catch (e) {
			res
				.status(500)
				.send({ message: 'Server error' })
		}
	})

router.post('/registration',
	async (req, res) => {
		try {
			const { login, password, secretKey } = req.body

			if ((login.length < 3) || password.length < 3) {
				return res.status(412).json({ message: 'The field values must be at least 3' })
			}

			const users = firestore.collection('users')
				.where('login', '==', login)

			const getUsers = await users.get()

			const arrayFromUsers = getUsers.docs.map(doc => {
				return doc.data()
			})

			if (arrayFromUsers.length) {
				return res.status(412).json({ message: `User with login ${login} already exist` })
			}

			const isAdmin = SECRET_ADMIN_KEY === String(secretKey)

			const hashPassword = await bcrypt.hash(password, 6)

			await firestore.collection('users').add({ login: String(login), password: String(hashPassword), admin: isAdmin })

			const token = jwt.sign({ login: String(login), admin: String(isAdmin) }, SECRET_KEY, { expiresIn: '24h' })

			res
				.status(201)
				.cookie('token', `Bearer ${token}`, {
					sameSite: 'strict',
					path: '/',
					expires: new Date(new Date().getTime() + 86400000),
					httpOnly: true,
					secure: true
				})
				.json({ message: 'User was created' })
		} catch (e) {
			res
				.status(500)
				.send({ message: 'Server error' })
		}
	})

router.get('/auth', authMiddleware,
	async (req, res) => {
		try {
			const { login } = req.user

			const users = firestore.collection('users')
				.where('login', '==', login)

			const getUsers = await users.get()

			const arrayFromUsers = getUsers.docs.map(doc => {
				return doc.data()
			})

			const token = jwt.sign({ login: arrayFromUsers[0].login, admin: arrayFromUsers[0].admin }, SECRET_KEY, { expiresIn: '24h' })

			return res
				.status(200)
				.cookie('token', `Bearer ${token}`, {
					sameSite: 'strict',
					path: '/',
					expires: new Date(new Date().getTime() + 86400000),
					httpOnly: true,
					secure: true
				})
				.json({
					user: {
						login: arrayFromUsers[0].login,
						admin: arrayFromUsers[0].admin
					}
				})
		} catch (e) {
			res
				.status(500)
				.send({ message: 'Server error' })
		}
	})

module.exports = router