import React from "react";
export default function Start(props){
    return(
    <div className="start-screen">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button onClick={props.handleStartBtn}>Start Quiz</button>
    </div>
    )
}