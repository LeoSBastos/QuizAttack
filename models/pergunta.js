const mongoose = require('mongoose')

const perguntasSchema = new mongoose.Schema({
	questao: {
		type: String,
		required: true
	},
	respostas: {
		type: [{
			resposta: String,
			certa: Boolean
		}],
		required: true
	},
	tipo: {
		type: String,
		required: true
	},
	pontuacao: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('perguntas', perguntasSchema)