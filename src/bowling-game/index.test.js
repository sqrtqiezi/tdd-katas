const Game = require('.')

describe('Bowling Game', function() {
  let game 
  
  beforeEach(() => {
    game = new Game()
  })

  it('start with 0 score', function() {
    expect(game.score).toBe(0)
  })

  it('roll pins', () => {
    game.roll(1)
    game.roll(1)
    game.roll(1)
    game.roll(1)
    expect(game.score).toBe(4)
  })

  it('add socre after a frame', () =>{
    game.roll(1)
    game.roll(1)
    game.roll(1)
    expect(game.score).toBe(2)
  })

  it('have a spare', () => {
    game.roll(2)
    game.roll(8)
    game.roll(5)
    expect(game.score).toBe(15)
  })

  it('have two spare', () => {
    game.roll(2)
    game.roll(8)
    game.roll(5)
    game.roll(5)
    game.roll(3)
    expect(game.score).toBe(28)
  })

  it('have a strike', () => {
    game.roll(10)
    game.roll(2)
    game.roll(7)
    expect(game.score).toBe(28)
    expect(game.frameCount).toBe(2)
  })

  it('have a strike and a spare', () => {
    game.roll(10)
    game.roll(2)
    expect(game.score).toBe(0)
    game.roll(8)
    expect(game.score).toBe(20)
    game.roll(5)
    expect(game.score).toBe(35)
  })

  it('game should be finish', () => {
    for (let i = 0; i < 20; i++) {
      game.roll(0)
    }
    expect(game.finished).toBeTruthy()
    game.roll(1)
    game.roll(1)
    expect(game.score).toBe(0)
  })

  it('when have a strike in tenth frame, should have third roll', () => {
    for (let i = 0; i < 18; i++) {
      game.roll(0)
    }
    game.roll(10)
    game.roll(5)
    game.roll(5)
    expect(game.score).toBe(20)
  })

  it('when have a spare in tenth frame, should have third roll', () => {
    for (let i = 0; i < 18; i++) {
      game.roll(0)
    }
    game.roll(2)
    game.roll(8)
    game.roll(5)
    expect(game.score).toBe(15)
  })

  it('the max score is 300', () => {
    for (let i = 0; i < 12; i++) {
      game.roll(10)
    }
    expect(game.score).toBe(300)
  })

  it('let\'s play a full game', () => {
    expect(game.score).toBe(0)
    game.roll(1)
    game.roll(4)
    expect(game.score).toBe(5)
    game.roll(4)
    game.roll(5)
    expect(game.score).toBe(14)
    game.roll(6)
    game.roll(4)
    game.roll(5)
    expect(game.score).toBe(29)
    game.roll(5)
    game.roll(10)
    expect(game.score).toBe(49)
    game.roll(0)
    game.roll(1)
    expect(game.score).toBe(61)
    game.roll(7)
    game.roll(3)
    game.roll(6)
    expect(game.score).toBe(77)
    game.roll(4)
    game.roll(10)
    expect(game.score).toBe(97)
    game.roll(2)
    game.roll(8)
    expect(game.score).toBe(117)
    game.roll(6)
    expect(game.score).toBe(133)
  })
})