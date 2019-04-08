function aggregate(frame, n) {
  return frame.slice(0, n)
    .reduce((aggr, pins) => aggr + pins, 0)
}

function isMuff(frame) {
  return frame.length > 1
    && aggregate(frame, 2) < 10
}

function isSpare(frame) {
  return frame.length > 2
    && aggregate(frame, 2) === 10
}

function isStrike(frame) {
  return frame.length > 2
    && frame[0] === 10
}

class Game {
  constructor() {
    this.score = 0
    this.frame = []
    this.frameCount = 0
  }

  get finished() {
    return this.frameCount > 9
  }

  check() {
    if (isMuff(this.frame)) {
      this.score += aggregate(this.frame, 2)
      this.frame.splice(0, 2)
      this.frameCount++
    }
    if (isSpare(this.frame)) {
      this.score += aggregate(this.frame, 3)
      this.frame.splice(0, 2)
      this.frameCount++
    }
    if (isStrike(this.frame)) {
      this.score += aggregate(this.frame, 3)
      this.frame.splice(0, 1)
      this.frameCount++
      this.check()
    }
  }

  roll(pins) {
    if (this.finished) return
    this.frame.push(pins)
    this.check()
  }
}

module.exports = Game
