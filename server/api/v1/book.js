const Router = require('express')
const router = new Router()
const authMiddleware = require('../../middleware/auth.middleware')
const { firestore } = require('../../base')

router.post('/book',
	async (req, res) => {
		try {
			const { title, author, year, ISBN } = req.body

			if (year > new Date().getFullYear()) {
				return res
					.status(412)
					.json({ message: 'Invalid year' })
			}

			const books = firestore.collection('books')
				.where('ISBN', '==', ISBN)

			const getBooks = await books.get()

			const arrayFromBooks = getBooks.docs.map(doc => {
				return doc.data()
			})

			if (arrayFromBooks.length) {
				return res
					.status(412)
					.json({ message: 'Book is already exist' })
			}

			firestore.collection('books').add({ title: String(title), author: String(author), year: Number(year), ISBN: String(ISBN) })

			return res
				.status(201)
				.json({
					message: 'Book was added'
				})
		} catch (e) {
			res
				.status(500)
				.json({ message: 'Server error' })
		}
	})

router.patch('/book',
	async (req, res) => {
		try {
			const { data } = req.body

			const bookData = data.book

			const books = firestore.collection('books')
				.where('ISBN', '==', bookData.ISBN)

			const getBooks = await books.get()

			const arrayFromBooks = getBooks.docs.map(doc => {
				return doc.data()
			})

			if (!arrayFromBooks.length) {
				return res
					.status(404)
					.json({ message: 'Unknown ISBN' })
			}

			if (bookData.year.length) {
				if (bookData.year > new Date().getFullYear()) {
					return res
						.status(412)
						.json({ message: 'Invalid year' })
				}
			}

			const updateBookData = {}
			for (const [key, value] of Object.entries(bookData)) {
				if (value.length) {
					updateBookData[key] = value
				}
			}

			getBooks.forEach(book => {
				book.ref.update(updateBookData)
			})

			return res.status(201).json({
				message: 'Book changed'
			})
		} catch (e) {
			res
				.status(500)
				.json({ message: 'Server error' })
		}
	})

router.delete('/book:ISBN', authMiddleware,
	async (req, res) => {
		try {
			if (!req.user.admin) {
				return res
					.status(403)
					.json({ message: 'Forbidden request' })
			}

			const { ISBN } = req.params

			const books = firestore.collection('books')
				.where('ISBN', '==', ISBN)

			const getBooks = await books.get()

			getBooks.forEach(bookCollection => {
				bookCollection.ref.delete()
			})

			return res
				.status(200)
				.json({
					message: 'Book was deleted'
				})

		} catch (e) {
			res
				.status(500)
				.json({ message: 'Server error' })
		}
	})

module.exports = router
