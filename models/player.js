const mongoose = require('mongoose')
const validator = require('validator')

const playersSchema = new mongoose.Schema({
	login: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	nick: {
		type: String,
		required: true
	},
	wins: {
		type: Number,
		default: 0
	},
	loss: {
		type: Number,
		default: 0
	},
	active: {
		type: Boolean,
		default: false
	},
	admin: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('players', playersSchema)