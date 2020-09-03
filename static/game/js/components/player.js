Crafty.c('Player', {
	required: '2D, DOM, Fourway, Collision, PlayerSprite, KeyBoard, Mouse',
	init() {
		const rand = () => (Math.random() * 5070) - 2560
		this.attr({
			x: rand(),
			y: rand(),
			angle: 0,
			w: 50,
			h: 50
		})
		this.origin("center")

		this.prop = {
			currentHp: 100,
			velocityMultiplier: 1,
			shootVelocity: 300,
			numberOfShots: 1,
		}

		this.fourway(200 * this.prop.velocityMultiplier)
		this.checkHits("Bullet")

		socket.emit('playerStart', { x: this.x, y: this.y })

		this.onHit('Bullet', balas => {
			balas.forEach(bala => {
				if(!bala.obj.fromPlayer){
					Crafty.audio.play('damage')
					bala.obj.destroy()
					this.prop.currentHp -= 10
					$("#currentHp").innerText = "Vida: "+this.prop.currentHp
					console.log(this.prop.currentHp);
					if (this.prop.currentHp <= 0) {
						Crafty.audio.play('gameover')
						socket.disconnect();
						this.destroy()
					}
				}
			})
		})

	},
	events: {
		Move(evt) {
			socket.emit('moving', evt)
			var hitDatas, hitData;
			if ((hitDatas = this.hit('Stone'))) {
				hitData = hitDatas[0];
				if (hitData.type === 'SAT') {

					this.x -= hitData.overlap * hitData.nx;
					this.y -= hitData.overlap * hitData.ny;
				} else {
					this.x = evt._x;
					this.y = evt._y;
				}
			}
		},
		EnterFrame(){
			this.angle = Math.atan2(mouseY - this.y, mouseX - this.x)
			this.rotation = Crafty.math.radToDeg(this.angle)
			socket.emit("playerRotation", this.rotation)
		}
	},
	shot(){
		const ns = this.prop.numberOfShots;
		for (var i = 1; i <= ns; i++) {
			const b = Crafty.e('Bullet').attr({
				fromPlayer: true,
				x: this.x + 20,
				y: this.y + 20,
				vx: (Math.cos(this.angle)*i) * this.prop.shootVelocity,
				vy: (Math.sin(this.angle)*i) * this.prop.shootVelocity
			})
			Crafty.audio.play('shoot')
			socket.emit('shot', b.x, b.y, b.vx, b.vy)
		}
	},
	setVelocity(val){
		this.prop.velocityMultiplier = val
	}
})
