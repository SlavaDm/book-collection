const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./api/v1/auth')
const bookRouter = require('./api/v1/book')

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/v1/book-collection/auth', authRouter)
app.use('/v1/book-collection/book', bookRouter)

app.get('/health', (req, res) => {
	res.status(200)
})

app.get('/version', (req, res) => {
	res.status(200).json({ version: 'v1' })
})

try {
	app.listen(5000, () => {
		console.log('Server started on port ', 5000)
	})

} catch (e) {
	console.log(e)
}
