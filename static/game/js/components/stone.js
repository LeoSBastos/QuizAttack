Crafty.c('Stone', {
	required: '2D, DOM, StoneSprite, Collision',
	init() {
		this.attr({
			w: 128,
			h: 128
		})
		this.onHit('Brush', () => {
			this.destroy()
		})
	}
})
