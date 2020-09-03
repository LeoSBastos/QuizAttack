const router = require('express').Router()
const Pergunta = require('../models/pergunta')
const auth = require('../middlewares/auth.js')

router.post('/', auth({ admin: true }), (req, res) => {
	Pergunta.create(req.body, (err, result) => {
		if (err) res.status(400).send(err.ValidationError)
		else res.json(result)
	})
})

router.get('/', (req, res) => {
	Pergunta.find({}, '_id questao respostas.resposta tipo pontuacao', (err, result) => {
		if (err) res.status(400).send(err.ValidationError)
		else res.json(result)
	})
})

router.get('/:id', (req, res) => {
	Pergunta.findById(req.params.id, '_id questao respostas.resposta tipo pontuacao', (err, result) => {
		if (err) res.status(400).send(err.ValidationError)
		else res.json(result)
	})
})

router.delete('/:id', auth({ admin: true }), (req, res) => {
	Pergunta.findByIdAndRemove(req.params.id, (err, result) => {
		if (err) res.status(400).send(err.ValidationError)
		else res.json(result)
	})
})

router.put('/:id', auth({ admin: true }), (req, res) => {
	Pergunta.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
		if (err) res.status(400).send(err.ValidationError)
		else res.json(result)
	})
})

module.exports = router
