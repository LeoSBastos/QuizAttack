const jwt = require('jwt-simple')
const Player = require('../models/player.js')

module.exports = (opts) => (req, res, next) => {
	const token = req.get('x-access-token')
	try {
		const obj = jwt.decode(token, process.env.SECRET)
		if (obj.exp && Date.now() > obj.exp) res.sendStatus(401)
		else {
			User.findById(obj.id, (err, result) => {
				if (err) res.status(500).send(err.message)
				else if (!result || !result.active) res.sendStatus(401)
				else if (opts.admin && !result.admin) res.sendStatus(401)
				else {
					req.user = result
					next()
				}
			})
		}
	}
	catch (err) {
		res.sendStatus(401)
	}
}
