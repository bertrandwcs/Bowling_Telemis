var lodash = require("lodash");

class Player {
  constructor() {
    this._quilles = [...Array(16).keys()];
    this._currentFrame = 0;
    this._gameIndex = 0;
    this._hitScore = [];
    this._hitScoreByFrame = [[], [], [], [], [], []];
    this._frameScore = [];
    this._cumulativeScores = 0;
    this._gameOver = false;
    this._spare = [[], [], [], [], [], []];
    this._strike = [[], [], [], [], [], []];
    this._cumulativeScorestwo = [];
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
    return this._gameIndex++;
  }

  incrementCurrentFrame() {
    if (this._gameIndex % 3 === 0) {
      return this._currentFrame++;
    }
  }
  set turnToGameOver(bool) {
    if (this._gameIndex > 14 && this._strike[this._currentFrame] !== true) {
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
      (this._cumulativeScorestwo.length = 0),
      (this._spare = [[], [], [], [], [], []]),
      (this._strike = [[], [], [], [], [], []])
    );
  }
  cumulativeScores(score) {
    return lodash.sum(score);
  }
  cumulativeScoresTwo() {
    console.log(this._hitScoreByFrame);

    let newArray = this._hitScoreByFrame.reduce((a, b) => a.concat(b));
    newArray = [newArray.reduce((prev, current) => prev + current)];
    console.log(this._hitScore[this._currentFrame]);
    console.log(...newArray);
    if (this._gameIndex % 3 === 0) {
      this._cumulativeScorestwo.push(...newArray);
      console.log(this._cumulativeScorestwo);
    }

    return this._cumulativeScoresTwo;
  }

  spare() {
    if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame]) === 15 &&
      this._gameIndex % 3 !== 1 &&
      this._currentFrame !== 4
    ) {
      console.log("spare");
      this._spare[this._currentFrame].push(true, true);
      this._hitScore.push(0);
      this._hitScoreByFrame[this._currentFrame].push(0);
      this._quilles = [...Array(16).keys()];
      this._currentFrame++;
      this._gameIndex++;
      /* alert("THI is A SPARE!!"); */
    } else if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame - 1]) === 15 &&
      this._gameIndex % 3 !== 1
    ) {
      this._currentFrame--;
      this._spare[this._currentFrame].push(true);
      this._quilles = [...Array(16).keys()];
      this._currentFrame++;
    }

    if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame]) === 15 &&
      this._gameIndex % 3 === 1 &&
      this._currentFrame !== 4
    ) {
      console.log("strike");
      this._hitScore.push(0, 0);
      this._hitScoreByFrame[this._currentFrame].push(0, 0);
      this._quilles = [...Array(16).keys()];
      this._strike[this._currentFrame].push(true);
      this._currentFrame++;
      this._gameIndex++;
      this._gameIndex++;
    } else if (
      lodash.sum(this._hitScoreByFrame[this._currentFrame]) === 15 &&
      this._currentFrame === 4
    ) {
      console.log("dernier frame strike");
      this._quilles = [...Array(16).keys()];
      this._strike[this._currentFrame].push(true);
      this._gameIndex++;
      this._hitScoreByFrame[this._currentFrame].push(
        this._hitScoreByFrame[this._currentFrame][this._gameIndex]
      );
    }
  }

  set hitScore(num) {
    this._hitScore.push(num);
    this._hitScoreByFrame[this._currentFrame].push(num);
    const currentScore = lodash.sum(this._hitScoreByFrame[this._currentFrame]);
    this._frameScore.splice(this._currentFrame, 1, currentScore);
    console.log(this._cumulativeScorestwo);
    if (
      this._spare[this._currentFrame - 1] !== undefined &&
      this._spare[this._currentFrame - 1].includes(true) &&
      this._gameIndex !== 5 &&
      this._gameIndex !== 8 &&
      this._gameIndex !== 11 &&
      this._gameIndex !== 14
    ) {
      this._frameScore[this._currentFrame - 1] =
        this._frameScore[this._currentFrame - 1] + num;
      this._hitScoreByFrame[this._currentFrame - 1].push(num);
    }
    if (
      this._strike[this._currentFrame - 1] !== undefined &&
      this._strike[this._currentFrame - 1].includes(true)
    ) {
      console.log("cumulative strike");
      console.log(this._cumulativeScorestwo);
      console.log(this._hitScoreByFrame);
      this._hitScoreByFrame[this._currentFrame - 1].push(num);
      console.log(this._hitScoreByFrame);
    }
  }
}

export let gamer = new Player();

export default Player;
