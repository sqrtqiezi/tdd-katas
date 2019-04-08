const Game = require('./bowling-game')

describe('Bowling Game', function () {
  let game

  beforeEach(function () {
    game = new Game()
  })

  it('Start a game with 0 score', () => {
    expect(game.score).toBe(0)
  })

  it('In each frame the player has two rolls to knock down 10 pins. ', () => {
    game.roll(1)
    expect(game.score).toBe(0)
    game.roll(1)
    expect(game.score).toBe(2)
  })

  it('The game consists of 10 frames. ', () => {
    for (let i = 0; i < 10; i++) {
      game.roll(1)
      game.roll(1)
    }
    expect(game.score).toBe(20)
    expect(game.finished).toBeTruthy()
    game.roll(1)
    game.roll(1)
    expect(game.score).toBe(20)
  })

  it('A spare is when the player knocks down all 10 pins in two rolls. The bonus for that frame is the number of pins knocked down by the next roll.', () => {
    game.roll(2)
    game.roll(8)
    expect(game.score).toBe(0)
    game.roll(5)
    expect(game.score).toBe(15)
    game.roll(2)
    expect(game.score).toBe(15 + 5 + 2)
  })

  it('A strike is when the player knocks down all 10 pins on his first roll. The frame is then completed with a single roll. The bonus for that frame is the value of the next two rolls.', () => {
    game.roll(10)
    game.roll(2)
    game.roll(5)
    expect(game.score).toBe(10 + 7 + 7)
  })

  it('In the tenth frame a player who rolls a spare or strike is allowed to roll the extra balls to complete the frame. However no more than three balls can be rolled in tenth frame.', () => {
    for (let i = 0; i < 9; i++) {
      game.roll(1)
      game.roll(1)
    }
    game.roll(8)
    game.roll(2)
    expect(game.finished).toBeFalsy()
    game.roll(10)
    expect(game.finished).toBeTruthy()
    expect(game.score).toBe(9*2 + 8 + 2 + 10)
  })

  it('The Max score of Bowling game is 300', () => {
    for (let i = 0; i < 12; i++) {
      game.roll(10)
    }
    expect(game.score).toBe(300)
    expect(game.finished).toBeTruthy()
  })
})