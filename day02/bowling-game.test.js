const Game = require('./bowling-game')

describe('Bowling game', function () {
  let game

  beforeEach(function () {
    game = new Game()
  })

  it('start with 0 score', () => {
    expect(game.score).toBe(0)
  })

  it('can rolls pins', () => {
    game.rolls(1)
    game.rolls(1)
    game.rolls(1)
    game.rolls(1)
    expect(game.score).toBe(4)
  })

  it('should not rolls more then 10 pins', () => {
    expect(() => {
      game.rolls(11)
    }).toThrowError('pins can not more then 10')
    
  })

  it('has frame', () => {
    game.rolls(1)
    game.rolls(1)
    game.rolls(1)
    expect(game.score).toBe(2)
  })

  it('score should not more then 10 in a frame', () => {
    expect(() => {
      game.rolls(3)
      game.rolls(8)
    }).toThrowError('invalidate frame')
  })

  it('have a strike', () => {
    game.rolls(10)
    game.rolls(2)
    game.rolls(5)
    expect(game.score).toBe(24)
  })

  it('score should not more then 10 in a frame after a strike', () => {
    expect(() => {
      game.rolls(10)
      game.rolls(3)
      game.rolls(8)
    }).toThrowError('invalidate frame')
  })

  it('have a spare', () => {
    game.rolls(2)
    game.rolls(8)
    game.rolls(5)
    expect(game.score).toBe(15)
  })

  it('game should be finished', () => {
    for (let i = 0; i < 20; i++) {
      game.rolls(1)
    }
    expect(game.finished).toBeTruthy()
    game.rolls(1)
    game.rolls(1)
    expect(game.score).toBe(20)
  })

  it('the max score is 300', () => {
    for(let i = 0; i < 12; i++) {
      game.rolls(10)
    }
    expect(game.score).toBe(300)
    expect(game.finished).toBeTruthy()
  })
})