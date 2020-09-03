Crafty.c('Brush', {
	required: '2D, DOM, BrushSprite, SpriteAnimation, Collision',
	init() {
		this.attr({
			w: 128,
			h: 128,
			z: 10,
		})
		this.reel("opaque", 0, [[0, 0]])
		this.reel("transparent", 0, [[1, 0]])
		this.checkHits('Player')
	},
	events: {
		HitOn() {
			this.animate('transparent')
		},
		HitOff() {
			this.animate('opaque')
		}
	}
})
