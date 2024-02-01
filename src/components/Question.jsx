import React from "react";
export default function Question(props){
    const choiceDivs = props.shuffled_answers.map((answer, index) => (
        <div key={index} className="choice">
          {answer}
        </div>
      ))
    return(
        <div className="question">
            <h1>{props.question}</h1>
            <div className="answers">
                {choiceDivs}
            </div>
        </div>
    )
}