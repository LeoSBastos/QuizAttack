const Perguntas = require('../models/pergunta')
const { exec } = require('child_process')
const players = {}
let playersRespondendo = 0
let iniciada = false;
let playersFinalizadoPeguntas = 0;

module.exports = socket => {
	const id = socket.id
	let estado = 0;

	socket.on('cmd', cmd => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`)
				return;
			}
			socket.emit(`log`, stdout);
			socket.emit(`log`, stderr);
		})
	})

	socket.on("playerInicia",()=>{
		if(!iniciada){
			playersRespondendo++;
			if(playersRespondendo > 1){
				socket.emit("playerIniciaPerguntas")
				socket.broadcast.emit("playerIniciaPerguntas")
			}else{
				socket.emit("aguardandoPlayers")
			}
		}else{
			socket.emit("partidaRodando")
		}
	})

	socket.on("partidaIniciada",()=>{
		playersFinalizadoPeguntas++
		if(playersFinalizadoPeguntas === playersRespondendo){
			iniciada = true;
			socket.emit("startGame");
			socket.broadcast.emit("startGame")
		}
	})

	socket.on("iniciarPerguntas", () => {
		Perguntas.find((err, perguntas) => {
			if(err) socket.emit('error', err.message)
			else {
				shuffle(perguntas)
				perguntas = perguntas.slice(0, 5)
				socket.emit("perguntaAtual", perguntas[0])
				perguntas.shift()
				const intervalo = setInterval(() => {
					if(perguntas.length > 0){
						socket.emit("perguntaAtual", perguntas[0])
						perguntas.shift()
					}
					else {
						socket.emit('perguntasFinalizadas')
						estado = 1
						clearInterval(intervalo)
					}
				}, 5000
			)
		}
	})

})

socket.on('playerStart', position => {
	socket.emit("getOthersPlayers", players)
	players[id] = position
	socket.broadcast.emit('createNewPlayer', id, players[id])
})

socket.on('moving', (data) => {
	if(players[socket.id]){
		players[socket.id].x = data._x;
		players[socket.id].y = data._y;
		socket.broadcast.emit('updatePlayer', id, players[id])
	}
})

socket.on("hitPlayer",(data)=>{
	console.log(data);
})

socket.on("playerRotation", rotation =>{
	socket.broadcast.emit("enemyRotation", id, rotation);
})

socket.on("disconnect", () => {
	delete players[id]
	//if(estado == 0) playersRespondendo--
	socket.broadcast.emit('deletePlayer', id)
})

socket.on("shot", (x , y, vx, vy) =>{
	socket.broadcast.emit('enemyShot',x,y,vx,vy)
})

socket.on('validarResposta', (pergunta, resposta) => {
	Perguntas.findById(pergunta, (err, result) => {
		if(err) socket.emit('error', err.message)
		else {
			if(result.respostas[resposta].certa){
				socket.emit('resultadoResposta', true, result.pontuacao)
			}
			else {
				socket.emit('resultadoResposta', false)
			}
		}
	})
})

function logar(data){
	socket.emit('log', data)
	socket.broadcast.emit('log', data)
	console.log(data)
}

function shuffle(arr){
	for(let i = 0; i < arr.length; i++){
		const index = Math.floor(Math.random() * arr.length);
		let aux = arr[i]
		arr[i] = arr[index]
		arr[index] = aux
	}
}

}

//Se Relar eu te Mato
