Crafty.scene('LoadScene', () => {

	const assets = {
		sprites: {
			'sprites/player.png': {
				tile: 50,
				tileh: 50,
				map: {
					PlayerSprite: [0, 0]
				}
			},
			'sprites/enemy.png': {
				tile: 50,
				tileh: 50,
				map: {
					EnemySprite: [0, 0]
				}
			},
			'sprites/stone.png': {
				tile: 128,
				tileh: 128,
				map: {
					StoneSprite: [0, 0]
				}
			},
			'sprites/brushes.png': {
				tile: 128,
				tileh: 128,
				map: {
					BrushSprite: [0, 0]
				}
			},
			'sprites/bullet.png': {
				tile: 10,
				tileh: 10,
				map: {
					BulletSprite: [0, 0]
				}
			},
		},
		images: ['sprites/grass.png'],
		audio: {
			theme: 'sounds/bg.mp3',
			shoot: 'sounds/piu.mp3',
			damage: 'sounds/damage.mp3',
			gameover: 'sounds/morreu.mp3',
			buy: 'sounds/katchin.mp3'
		}
	}

	Crafty.e('2D, Canvas, Text')
	.attr({
		x: 50,
		y: 50
	})
	.text('Carregando...')
	.textFont({ size: '20pt', family: 'arial' })

	Crafty.load(assets, () => {
		Crafty.scene('PerguntasScene')
	})

})
