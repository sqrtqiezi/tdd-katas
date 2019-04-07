function isMuff(frame) {
  return frame.length === 2 && frame[0] + frame[1] < 10
}

function isSpare(frame) {
  return frame.length === 3 && frame[0] + frame[1] === 10
}

function isStrike(frame) {
  return frame.length === 3 && frame[0] === 10
}

function aggregate(frame, count) {
  return frame.slice(0, count)
    .reduce((agg, value) => agg + value, 0)
}

class Game {
  constructor() {
    this.score = 0
    this.finished = false
    this.frame = []
    this.frameCount = 0
  }

  check() {
    if (isMuff(this.frame)) {
      this.score += aggregate(this.frame, 2)
      this.frame.splice(0, 2)
      this.frameCount++
    }
    if (isStrike(this.frame)) {
      this.score += aggregate(this.frame, 3)
      this.frame.splice(0, 1)
      this.frameCount++
      this.check()
    }
    if (isSpare(this.frame)) {
      this.score += aggregate(this.frame, 3)
      this.frame.splice(0, 2)
      this.frameCount++
      this.check()
    }
  }

  roll(pins) {
    if (!this.finished) {
      this.frame.push(pins)
      this.check()
      if (this.frameCount === 10) {
        this.finished = true
      }
    }
  }
}

module.exports = Game