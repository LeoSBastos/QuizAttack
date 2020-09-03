const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const routerfy = require('routerfy')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 8080

mongoose.connect('mongodb://root:aindamemato123@ds014368.mlab.com:14368/api-quizattack')
const db = mongoose.connection

db.once('open', () => {
	io.on('connection', socket => {
		require('./socket')(socket)
	})
	server.listen(port, () => {
		console.log(`Rodou desgraça na ${port}`)
	})
})

//Middlewares
app.use(cors())
app.use(compression())
app.use(serveStatic('static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routerfy('routes'))
