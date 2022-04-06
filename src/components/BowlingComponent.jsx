import { gamer } from "../utilities/bowlingMethods";
import React, { useEffect, useState } from "react";
import "./bowlingComponent.css";
import { isEmpty } from "../utilities/isEmpty";
import imgStrike from "../utilities/pictures/bowling-strike.gif"



const BowlingComponent = () => {

    const [quilles, setQuilles] = useState([])
    const [currentFrame, setCurrentFrame] = useState("")
    const [currentHitScore, setCurrentHitScore] = useState([])
    const [frameScore, setFrameScore] = useState([])
    const [cumulativeScore, setCumulativeScore] = useState("")
    const [gameOver, setGameOver] = useState('')
    const [cumulativeScores, setCumulativeScores] = useState([])
    const [strike, setStrike] = useState([])
    const [spare, setSpare] = useState([])
    const [gameIndex, setGameIndex] = useState('')

    useEffect(() => {
        setQuilles(gamer._quilles)
        setSpare(gamer._spare)
        setStrike(gamer._strike)
        if (!isEmpty(spare) && spare[currentFrame].includes(true) && spare[currentFrame].length === 2) {
            currentHitScore.splice(gameIndex, 2, "/", "")
        } else if (currentFrame !== 0 && !isEmpty(spare) && spare[currentFrame].includes(true) && spare[currentFrame].length === 1) {
            currentHitScore.splice(gameIndex, 1, "/")
        };
        setGameIndex(gamer._gameIndex)
        setCurrentFrame(gamer._currentFrame)
        if (!isEmpty(strike) && strike[currentFrame][0] === true && currentFrame < 6) {
            currentHitScore.splice(gameIndex, 3, "x", "", "")
        }
        setStrike(gamer._strike)
    }, [cumulativeScore, currentHitScore])



    const handleClickHit = (num) => {
        console.log("click")
        gamer.incrementGameIndex();
        gamer.hitScore = num
        gamer.incrementCurrentFrame();
        gamer.quilles = num
        gamer.strike(num)
        gamer.spare(num)
        gamer.cumulativeScores(num)
        setCumulativeScores(gamer._cumulativeScores)
        setGameOver(gamer._gameOver)
        setFrameScore(gamer._frameScore)
        setCumulativeScore([num])
        setCurrentHitScore(gamer._hitScore);
        setStrike(gamer._strike)
        gamer.turnToGameOver = true
    }
    const handleReset = () => {
        setCurrentHitScore([])
        setCurrentFrame(0)
        setCumulativeScore(0)
        setGameOver(false)
        setSpare([])
        setStrike([])
        gamer.reset()
    }



    return (
        <div>
            <div className="banner">
                African Bowling
            </div>

            <div>

                <div className="button-container">

                    {quilles.map((num, index) => {
                        return <button className="button_class" key={index} onClick={() => {
                            handleClickHit(num)
                        }}>{typeof (num) === "number" ? "?" : num}</button>;
                    })}

                </div>
                <div className="game">
                    <p>Game status: {gameOver ? <span className="status-gameover"> Game Over</span> : <span className="status"> Playing...</span>}</p>
                    <button className="button_reset" onClick={handleReset}>Reset</button>
                </div>

            </div>



            <div className="score">
                <table id='scoresheetTable' className='scoresheet' cellPadding='1' cellSpacing='0'>
                    <tr className="frame-container">
                        <th colSpan='6'>Frame 1</th>
                        <th colSpan='6'>Frame 2</th>
                        <th colSpan='6'>Frame 3</th>
                        <th colSpan='6'>Frame 4</th>
                        <th colSpan='6'>Frame 5</th>
                    </tr>
                    <tr>
                        {currentHitScore ? currentHitScore.map((elem, index) => {

                            return (<td colSpan='2' className="current-hitscore">{elem}</td>
                            )
                        }) : ""}
                    </tr>
                    <tr>
                        {cumulativeScores ? cumulativeScores.map((elem, index) => {
                            return <td colSpan='6' className="cumulative-score">{elem}</td>
                        }) : ""}
                    </tr>
                </table>
                {strike[currentFrame - 1] && strike[currentFrame - 1][0] === true ? <> <img className="img-strike" src={imgStrike} alt="img-strike" /><p>This is a strike!!</p> </> : ""}
            </div>



            <div>
            </div>
        </div>
    );
};

export default BowlingComponent;