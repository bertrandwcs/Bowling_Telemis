import { gamer } from "../utilities/bowlingMethods";
import React, { useEffect, useState } from "react";
import "./displayButton.css";
/* import { isEmpty } from "../utilities/isEmpty"; */



const DisplayButton = () => {

    const [quilles, setQuilles] = useState([])
    const [currentFrame, setCurrentFrame] = useState("")
    const [currentHitScore, setCurrentHitScore] = useState([])
    const [frameScore, setFrameScore] = useState([])
    const [cumulativeScore, setCumulativeScore] = useState([])
    const [gameOver, setGameOver] = useState('');
    const [strike, setStrike] = useState([])
    console.log(currentHitScore)

    useEffect(() => {
        setQuilles(gamer._quilles)
        console.log(quilles)

    }, [currentHitScore, currentFrame])
    console.log(quilles)

    const handleClickHit = (num) => {
        gamer.hitScore = num
        setCurrentHitScore(gamer._hitScore);
        console.log(gamer.hitScore)
        console.log(currentHitScore)
        gamer.incrementGameIndex();
        gamer.incrementCurrentFrame();
        setCurrentFrame(gamer._currentFrame)
        gamer.turnToGameOver = true
        setGameOver(gamer._gameOver)
        setFrameScore(gamer._frameScore)
        gamer.quilles = num
        gamer.spare()
        setStrike(gamer._strike)
        setCumulativeScore(gamer._cumulativeScores)
        gamer.cumulativeScores()

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
            <div className="banner">
                African Bowling
            </div>

            <div>

                <div className="button-container">

                    {quilles.map((num, index) => {
                        return <button className="button_class" key={index} onClick={() => {
                            handleClickHit(num)
                        }}>{num}</button>;
                    })}

                </div>

            </div>



            <div className="score">
                <table id='scoresheetTable' className='scoresheet' cellPadding='1' cellSpacing='0'>
                    <tr>
                        <th colSpan='6'>Frame 1</th>
                        <th colSpan='6'>Frame 2</th>
                        <th colSpan='6'>Frame 3</th>
                        <th colSpan='6'>Frame 4</th>
                        <th colSpan='6'>Frame 5</th>
                    </tr>
                    <tr>
                        {currentHitScore ? currentHitScore.map((elem) => {

                            return (<td colSpan='2'>{elem}</td>
                            )
                        }) : ""}
                    </tr>
                    <tr>
                        {cumulativeScore ? cumulativeScore.map(elem => {
                            return <td colSpan='6'>{elem}</td>
                        }) : ""}
                    </tr>
                </table>
            </div>



            <div className="game">
                <p>Game status: {gameOver ? "game over" : <span className="status"> in progress</span>}</p>
                <button className="button_reset" onClick={handleReset}>Reset</button>
            </div>
            <div>
            </div>
        </div>
    );
};

export default DisplayButton;