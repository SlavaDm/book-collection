const jwt = require('jsonwebtoken')
const config = require('config')
const SECRET_KEY = config.get('SECRET_KEY')

module.exports = (req, res, next) => {
	try {
		const token = req.cookies?.token?.split(' ')[1]

		if (!token) {
			return res.status(401).json({ message: 'Auth error' })
		}

		const decoded = jwt.verify(token, SECRET_KEY)

		req.user = decoded
		next()
	} catch (e) {
		return res.status(401).json({ message: 'Auth error' })
	}
}