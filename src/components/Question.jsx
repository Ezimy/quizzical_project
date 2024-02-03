import React from "react";
import { decode } from 'html-entities';
export default function Question(props) {
  const choiceRadios = props.shuffled_answers.map((answer, index) => (
    <label
    key={index}
    className={`choice-radio ${props.selectedAnswer === decode(answer) ? 'selected' : ''}
     ${props.isSubmitted && props.selectedAnswer === decode(answer) && props.correct_answer === decode(answer) ? 'correct' : ''}
     ${props.isSubmitted && props.selectedAnswer === decode(answer) && props.correct_answer !== decode(answer) ? 'incorrect' : ''}`}
  >
      <input
        type="radio"
        name={`answer_${props.id}`} // Use a unique name for each question
        value={decode(answer)}
        onChange={() => props.onAnswerChange(props.id, decode(answer))}
        // className={props.isSubmitted && props.correct_answer === decode(answer) ? 'correct' : ''}
      />
      {decode(answer)}
    </label>
  ))
  return (
    <div className="question">
      <h1>{props.question}</h1>
      <div className="answers">
        {choiceRadios}
      </div>
    </div>
  )
}