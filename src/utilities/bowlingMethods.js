var lodash = require("lodash");

class Player {
  constructor() {
    this._quilles = [...Array(16).keys()];
    this._currentFrame = 0;
    this._gameIndex = 0;
    this._hitScore = [];
    this._hitScoreByFrame = [[], [], [], [], [], []];
    this._frameScore = [];
    this._gameOver = false;
    this._spare = [[], [], [], [], [], []];
    this._strike = [[], [], [], [], [], []];
    this._cumulativeScores = [];
  }
  // set propeties value to initial statement
  reset() {
    return (
      (this._hitScore.length = 0),
      (this._currentFrame = 0),
      (this._gameIndex = 0),
      (this._frameScore.length = 0),
      (this._hitScoreByFrame = [[], [], [], [], [], []]),
      (this._gameOver = false),
      (this._quilles = [...Array(16).keys()]),
      (this._spare.length = 0),
      (this._cumulativeScores.length = 0),
      (this._spare = [[], [], [], [], [], []]),
      (this._strike = [[], [], [], [], [], []])
    );
  }

  get frame() {
    return this._currentFrame;
  }

  get gameIndex() {
    return this._gameIndex;
  }
  get hitScore() {
    return this.hitScore;
  }
  get quilles() {
    return this._quilles;
  }
  //increment the game index into the global array
  incrementGameIndex() {
    if (this._gameIndex < 15) {
      this._gameIndex++;
    } else {
      return this._gameIndex;
    }
  }
  //increment the sub array by frame's turn
  incrementCurrentFrame() {
    if (this._currentFrame < 6) {
      if (this._gameIndex % 3 === 0) {
        this._currentFrame++;
      }
      return this._currentFrame;
    }
  }
  //Trigger the game over
  set turnToGameOver(bool) {
    if (this._gameIndex > 14) {
      return (this._gameOver = bool);
    }
  }
  //handle keels logic
  set quilles(hitPoint) {
    if (this.gameIndex % 3 === 0) {
      return (this._quilles = [...Array(16).keys()]);
    } else {
      return (this._quilles = this._quilles.slice(
        0,
        this._quilles.length - hitPoint
      ));
    }
  }

  //handle the cumulative score when it's a strike, a spare or neither
  cumulativeScores(hit) {
    if (
      this._currentFrame !== 0 &&
      (this._strike[this._currentFrame - 1][0] === true ||
        this._spare[this._currentFrame - 1].includes(true) === true) &&
      this._hitScoreByFrame[this._currentFrame].length < 4 &&
      this._hitScoreByFrame[this._currentFrame].length > 0
    ) {
      this._frameScore[this._currentFrame - 1] =
        this._frameScore[this._currentFrame - 1] + hit;
    }
    if (this._gameIndex % 3 === 0) {
      this._cumulativeScores.push(lodash.sum(this._frameScore));
    }
    return this._cumulativeScores;
  }

  // handle the spare case which receive the hit as a param from the bowlingComponent
  spare(hit) {
    if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame]) === 15 &&
      this._gameIndex !== 3 &&
      this._gameIndex !== 6 &&
      this._gameIndex !== 9 &&
      this._gameIndex !== 12 &&
      this._gameIndex !== 15 &&
      this._currentFrame !== 5
    ) {
      this._spare[this._currentFrame].push(true, true);
      this._hitScore.push(0);
      this._hitScoreByFrame[this._currentFrame].push(0);
      this._quilles = [...Array(16).keys()];
      this._currentFrame++;
      this._gameIndex++;
    }
    // push 2 current scores to previous current score in case of spare
    if (
      (this._currentFrame !== 0 &&
        this._spare[this._currentFrame - 1].includes(true) &&
        this._gameIndex % 3 === 1) ||
      (this._currentFrame !== 0 &&
        this._spare[this._currentFrame - 1].includes(true) &&
        this._gameIndex % 3 === 2)
    ) {
      this._hitScoreByFrame[this._currentFrame - 1].push(hit);
    }
  }

  // handle the strike case which receive the hit as a param from the bowlingComponent
  strike(hit) {
    if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame]) === 15 &&
      this._gameIndex % 3 === 1 &&
      this._currentFrame !== 6
    ) {
      this._hitScore.push(0, 0);
      this._hitScoreByFrame[this._currentFrame].push(0, 0);
      this._quilles = [...Array(16).keys()];
      this._strike[this._currentFrame].push(true);
      this._gameIndex += 2;
      this._currentFrame++;
    }
    // push 3 current scores to previous current score in case of strike
    if (
      (this._currentFrame !== 0 &&
        this._strike[this._currentFrame - 1][0] === true &&
        this._gameIndex % 3 === 1) ||
      (this._currentFrame !== 0 &&
        this._strike[this._currentFrame - 1][0] === true &&
        this._gameIndex % 3 === 2)
    ) {
      this._hitScoreByFrame[this._currentFrame - 1].push(hit);
    }
  }

  //handle the classic case of the incrementation of a hit
  set hitScore(hit) {
    if (this._currentFrame < 6) {
      this._hitScore.push(hit);
      this._hitScoreByFrame[this._currentFrame].push(hit);
      this._frameScore.splice(
        this._currentFrame,
        1,
        lodash.sum(this._hitScoreByFrame[this._currentFrame])
      );
    } else if (this._currentFrame > 6) {
      this._quilles = [...Array(16).keys()];
      this._hitScore.push(hit);
      this._hitScoreByFrame[this._currentFrame].push(hit);
      const currentScore = lodash.sum(
        this._hitScoreByFrame[this._currentFrame]
      );
      this._frameScore.splice(this._currentFrame, 1, currentScore);
      this._gameIndex++;
    }
  }
}
//instance a nieuw player object "gamer"
export let gamer = new Player();

export default Player;
