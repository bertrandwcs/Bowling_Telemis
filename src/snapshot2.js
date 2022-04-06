var lodash = require("lodash");

class Player {
  constructor() {
    this._quilles = [...Array(16).keys()];
    this._currentFrame = 0;
    this._gameIndex = 0;
    this._hitScore = [];
    this._hitScoreByFrame = [[], [], [], [], []];
    this._frameScore = [];
    this._gameOver = false;
    this._spare = [[], [], [], [], [], []];
    this._strike = [[], [], [], [], [], []];
    this._cumulativeScorestwo = [];
  }
  reset() {
    return (
      (this._hitScore.length = 0),
      (this._currentFrame = 0),
      (this._gameIndex = 0),
      (this._frameScore.length = 0),
      (this._hitScoreByFrame = [[], [], [], [], []]),
      (this._gameOver = false),
      (this._quilles = [...Array(16).keys()]),
      (this._spare.length = 0),
      (this._cumulativeScorestwo.length = 0),
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
  incrementGameIndex() {
    if (this._gameIndex < 16) {
      this._gameIndex++;
    } else {
      return this._gameIndex;
    }
  }

  incrementCurrentFrame() {
    if (this._currentFrame < 4) {
      if (this._gameIndex % 3 === 0) {
        this._currentFrame++;
      }
      return this._currentFrame;
    }
  }
  set turnToGameOver(bool) {
    if (
      this._gameIndex > 16 ||
      (this._strike[this._currentFrame].includes(true) !== true &&
        this._gameIndex > 24)
    ) {
      /* alert("Game Over"); */
      return (this._gameOver = bool);
    }
  }
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

  cumulativeScoresTwo(num) {
    console.log(this._currentFrame);
    console.log(this._gameIndex);
    console.log(this._hitScore);
    console.log(this._hitScoreByFrame);
    console.log(this._cumulativeScorestwo);
    console.log(this._frameScore);
    console.log(this._spare);
    console.log(this._strike);

    if (
      this._currentFrame !== 0 &&
      (this._strike[this._currentFrame - 1][0] === true ||
        this._spare[this._currentFrame - 1].includes(true) === true) &&
      this._hitScoreByFrame[this._currentFrame].length < 4 &&
      this._hitScoreByFrame[this._currentFrame].length > 0
    ) {
      console.log("cumulative strike");
      this._frameScore[this._currentFrame - 1] =
        this._frameScore[this._currentFrame - 1] + num;
    }

    console.log(this._cumulativeScorestwo);
    if (this._gameIndex % 3 === 0) {
      console.log("modulo cumulative");
      console.log(this._frameScore);
      this._cumulativeScorestwo.push(lodash.sum(this._frameScore));
      console.log(this._cumulativeScorestwo);
    }
    return this._cumulativeScorestwo;
  }

  spare(num) {
    if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame]) === 15 &&
      this._gameIndex !== 3 &&
      this._gameIndex !== 6 &&
      this._gameIndex !== 9 &&
      this._gameIndex !== 12 &&
      this._gameIndex !== 15 &&
      this._currentFrame !== 5
    ) {
      console.log("spare");
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
      console.log("ok detection spare -1");
      this._hitScoreByFrame[this._currentFrame - 1].push(num);
    }
  }
  strike(num) {
    if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame]) === 15 &&
      this._gameIndex % 3 === 1 &&
      this._currentFrame !== 5
    ) {
      console.log("strike");
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
      console.log("ok detection strike -1");
      this._hitScoreByFrame[this._currentFrame - 1].push(num);
    }
  }
  set hitScore(num) {
    if (this._currentFrame < 4) {
      this._hitScore.push(num);
      this._hitScoreByFrame[this._currentFrame].push(num);
      this._frameScore.splice(
        this._currentFrame,
        1,
        lodash.sum(this._hitScoreByFrame[this._currentFrame])
      );
    } else if (this._gameIndex < 19) {
      console.log("dernier");
      this._quilles = [...Array(16).keys()];
      this._hitScore.push(num);
      this._hitScoreByFrame[this._currentFrame].push(num);
      const currentScore = lodash.sum(
        this._hitScoreByFrame[this._currentFrame]
      );
      this._frameScore.splice(this._currentFrame, 1, currentScore);
      this._gameIndex++;
    }
  }
}

export let gamer = new Player();

export default Player;
