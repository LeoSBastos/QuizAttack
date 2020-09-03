
let player;
Crafty.scene('MainScene', () => {

	Crafty.audio.play('theme')

	Crafty.e('2D, DOM, Image')
	.attr({
		x: -worldSize / 2,
		y: -worldSize / 2,
		w: worldSize,
		h: worldSize
	})
	.image('sprites/grass.png', 'repeat')

	const enemies = {}

	//ENTIDADES

	player = Crafty.e('Player');
	document.querySelector('#buttonShop').show()

	spawnaMap(4)

	//VIEWPORT
	Crafty.viewport.bounds = { min: { x: -worldSize / 2, y: -worldSize / 2 }, max: { x: worldSize / 2, y: worldSize / 2 } }
	Crafty.viewport.follow(player)


	//SOCKETS

	socket.on("getOthersPlayers", (data) => {
		for (let key in data) {
			enemies[key] = Crafty.e(`Enemy`).attr({
				x: data[key].x,
				y: data[key].y
			})
		}
	})

	socket.on("updatePlayer", (id, data) => {
		const enemy = enemies[id]
		enemy.x = data.x
		enemy.y = data.y
	})

	socket.on("createNewPlayer", (id, data) => {
		enemies[id] = Crafty.e(`Enemy`).attr({
			x: data.x,
			y: data.y
		})
	})

	socket.on('deletePlayer', id => {
		if (enemies[id]) enemies[id].destroy()
		delete enemies[id]
	})

	socket.on('enemyRotation', (id, rotation) => {
		if (enemies[id]) enemies[id].rotation = rotation
	})

	socket.on('enemyShot', (x , y, vx, vy) =>{
		Crafty.e('Bullet').attr({
			x,
			y,
			vx,
			vy
		})
	})

	drawInfo()

	Crafty.e('2D, DOM, Mouse')
	.attr({
		x: -worldSize / 2,
		y: -worldSize / 2,
		w: worldSize,
		h: worldSize,
		z: 3
	})
	.bind('MouseMove', data => {
		mouseX = data.realX
		mouseY = data.realY
	})
	.bind('Click', () => {
		player.shot()
	})

	socket.on('disconnect', () => {
		setTimeOut(() => {
			location.href = 'gameover.html'
		}, 2000)
	})



})

function $(selector){
	return document.querySelector(selector)
}

shop = false;
function activeShop(){
	if(!shop){
		document.querySelector('#shop').show()
		shop = true
	}else{
		document.querySelector('#shop').close()
		shop = false
	}
}

function possibleBuy(valor){
	if((pontos - valor)>= 0){
		pontos -= valor
		Crafty.audio.play('buy')
		drawInfo();
		return true;
	}else{
		alert("Não foi Possivel Comprar, Dinheiro Insuficiente!")
		return false;
	}
}

function buyNumberOfShoots(valor){
	if (possibleBuy(valor)) {
		player.prop.numberOfShots++
	}
}

function buyBulletVel(valor){
	if (possibleBuy(valor)) {
		player.prop.shootVelocity *= 2
	}
}

function buyHP(valor){
	if (possibleBuy(valor)) {
		player.prop.currentHp *= 2
	}
}
function drawInfo(){
	$("#pontos").innerText = `Pontos: ${pontos}`
	$("#currentHp").innerText = "Vida: "+player.prop.currentHp
	$("#numberOfShots").innerText = "Numero de balas: " + player.prop.numberOfShots
	$("#shootVelocity").innerText = "Velocidade de Tiro: " + player.prop.shootVelocity
	$("#pontosShop").innerText = `Pontos: ${pontos}`
}
