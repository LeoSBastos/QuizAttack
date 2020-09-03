const router = require('express').Router()
const md5 = require('md5')
const jwt = require('jwt-simple')
const Player = require('../models/player')
const auth = require('../middlewares/auth.js')
const axios = require('axios')

router.post('/', (req, res) => {
	console.log(req.body)
	if(req.body.password != req.body.confirm_pw) res.status(500).send('As senhas não confirmam!')
	else {
		req.body.password = req.body.password ? md5(req.body.password) : null
		Player.create(req.body, (err, result) => {
			if (err) res.status(500).send(err.message)
			else res.json(result)
		})
	}
})

// router.get('/', (req, res) => {
// 	Player.find({}, '_id nome wins loss', (err, result) => {
// 		if (err) res.status(500).send(err.message)
// 		else res.json(result)
// 	})
// })
//
// router.get('/:id', (req, res) => {
// 	Player.findById(req.params.id, '_id nome wins loss', (err, result) => {
// 		if (err) res.status(500).send(err.message)
// 		else res.json(result)
// 	})
// })
//
// router.delete('/:id', auth({ admin: true }), (req, res) => {
// 	Player.findByIdAndRemove(req.params.id, (err, result) => {
// 		if (err) res.status(500).send(err.message)
// 		else res.json(result)
// 	})
// })
//
// router.put('/:id', auth({ admin: false }), (req, res) => {
// 	Player.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
// 		if (err) res.status(500).send(err.message)
// 		else res.json(result)
// 	})
// })

router.post('/login', (req, res) => {
	Player.findOne({ $or: [{ login: req.body.login }, { email: req.body.login }], password: md5(req.body.password) }, (err, result) => {
		if (err) res.status(500).send(err.message)
		else if(!result) res.status(500).send('Usuário ou senha inválidos')
		else res.json({
			token: jwt.encode({
				id: result._id,
				exp: Date.now() + 86400000
			}, process.env.SECRET),
			admin: result.admin
		})
	})
})

module.exports = router
