import { gamer } from "../utilities/bowlingMethods";
import React, { useEffect, useState } from "react";
import "./displayButton.css";
/* import { isEmpty } from "../utilities/isEmpty"; */



const DisplayButton = () => {

    const [quilles, setQuilles] = useState([])
    const [currentFrame, setCurrentFrame] = useState("")
    const [currentHitScore, setCurrentHitScore] = useState([])
    const [frameScore, setFrameScore] = useState([])
    const [cumulativeScore, setCumulativeScore] = useState('')
    const [gameOver, setGameOver] = useState('')


    useEffect(() => {
        setQuilles(gamer._quilles)

    }, [cumulativeScore, currentHitScore])


    const handleClickHit = (num) => {
        gamer.hitScore = num
        setCurrentHitScore(gamer._hitScore);
        gamer.incrementGameIndex();
        gamer.incrementCurrentFrame();
        setCurrentFrame(gamer._currentFrame)
        setCumulativeScore(gamer.cumulativeScores(currentHitScore))
        gamer.turnToGameOver = true
        setGameOver(gamer._gameOver)
        setFrameScore(gamer._frameScore)
        gamer.quilles = num
        gamer.spare()
    }
    const handleReset = () => {
        setCurrentHitScore([])
        setCurrentFrame(1)
        setCumulativeScore(0)
        setGameOver(false)
        gamer.reset()
    }



    return (
        <div>
            <div className="grid-container">
                {quilles.map((num, index) => {
                    return <button className="button-bowl" key={index} onClick={() => {
                        handleClickHit(num)
                    }}>{num}</button>;
                })}
            </div>
            <p>Current Frame: {currentFrame}</p>
            <div>
                <table id='scoresheetTable' className='scoresheet' cellPadding='1' cellSpacing='0'>
                    <tr>
                        <th colSpan='6'>Frame 1</th>
                        <th colSpan='6'>Frame 2</th>
                        <th colSpan='6'>Frame 3</th>
                        <th colSpan='6'>Frame 4</th>
                        <th colSpan='6'>Frame 5</th>
                    </tr>
                    <tr>
                        {currentHitScore ? currentHitScore.map(elem => {
                            return (<td colSpan='2'>{elem}</td>
                            )
                        }) : ""}
                    </tr>
                    <tr>
                        {frameScore ? frameScore.map(elem => {
                            return <td colSpan='6'>{elem}</td>
                        }) : ""}
                    </tr>
                </table>
            </div>

            <p>Cumulative Scores: {cumulativeScore}</p>
            <p>Game status: {gameOver ? "game over" : "in progress"}</p>
            <button onClick={handleReset}>Reset</button>
            <div id='scoresheet'>
            </div>
        </div>
    );
};

export default DisplayButton;