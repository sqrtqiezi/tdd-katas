function Game() {
  this.score = 0
  this.frame = []
  this.finished = false
  this.frameCount = 0
}

function aggregate(frame, n) {
  return frame.slice(0, n)
    .reduce((aggr, value) => aggr + value, 0)
}

function validateFrame(frame) {
  if (frame.length > 1
    && frame[0] !== 10
    && frame[0] + frame[1] > 10) {
      return false
    }
  if (frame.length > 2
    && frame[0] === 10
    && frame[1] !== 10
    && frame[1] + frame[2] > 10) {
      return false
    }
  return true
}

Game.prototype = {
  check: function() {
    if (!validateFrame(this.frame)) {
        throw new Error('invalidate frame')
      }

    if (this.frame.length > 1
      && this.frame[0] + this.frame[1] < 10) {
        this.score += aggregate(this.frame, 2)
        this.frame.splice(0, 2)
        this.frameCount++
      }
    
    if (this.frame.length > 2
      && this.frame[0] === 10) {
        this.score += aggregate(this.frame, 3)
        this.frame.splice(0, 1)
        this.check()
        this.frameCount++
      }
    
    if (this.frame.length > 2
      && this.frame[0] + this.frame[1] === 10) {
        this.score += aggregate(this.frame, 3)
        this.frame.splice(0, 2)
        this.frameCount++
      }

    if (this.frameCount === 10) {
      this.finished = true
    }
  },

  rolls: function(pins) {
    if (this.finished) return
    if (pins > 10) {
      throw new Error('pins can not more then 10')
    }
    this.frame.push(pins)
    this.check()
  }
}

module.exports = Game
