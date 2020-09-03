Crafty.c('Bullet', {
  required: '2D, DOM, Motion, BulletSprite, Motion, Collision',
  init() {
    this.attr({
      w: 10,
      h: 10
    })
    this.origin('center')
    this.onHit('Stone', () => {
      this.destroy()
    })
  },
  events: {
    EnterFrame(){
      if(this.x < -worldSize / 2 || this.x > worldSize / 2 || this.y < -worldSize/2 || this.y > worldSize/2) this.destroy()
    }
  }
})
