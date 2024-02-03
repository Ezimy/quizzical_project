import React, { useState, useEffect } from 'react';
import Start from '/src/components/Start.jsx';
import Question from '/src/components/Question.jsx';
import { decode } from 'html-entities';
import '/src/index.css';

export default function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  //useEffects
  useEffect(() => {
    // Set the body style based on whether Start is rendered
    document.body.style.justifyContent = started ? 'flex-start' : 'center';
    // Cleanup the style when the component unmounts
    return () => {
      document.body.style.justifyContent = 'initial';
    };
  }, [started]);
  useEffect(() => {
    // Count correct answers whenever selectedAnswers changes
    let count = 0;
    questions.forEach((question, index) => {
      const correctAnswer = question.correct_answer;
      const selectedAnswer = selectedAnswers[index];
      if (correctAnswer === selectedAnswer) {
        count++;
      }
    })
    setCorrectAnswerCount(count);
  }, [selectedAnswers]);

  //Handle functions
  function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        const questionsWithShuffledAnswers = data.results.map((question) => {
          const answers = [question.correct_answer, ...question.incorrect_answers];
          const shuffled_answers = shuffleArray(answers);
          return {
            ...question,
            shuffled_answers,
          };
        });
        setQuestions(questionsWithShuffledAnswers);
      });
  }
  function handleStartBtn(){
    setStarted(true)
    fetchQuestions()
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    // questions.forEach((question, index) => {
    //   const correctAnswer = question.correct_answer;
    //   const selectedAnswer = selectedAnswers[index];
    //   if (correctAnswer === selectedAnswer) {
    //   }
    // })
    console.log("submitted")
  };
  function handleAnswerChange(questionId, selectedAnswer) {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedAnswer,
    }))
  }
  function shuffleArray(array) {
    // Function to shuffle an array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  //creating question Elements for question container
  const questionElements = questions.map((question, index) => (
    <Question
      key={index}
      id={index}
      question={decode(question.question)}
      shuffled_answers={question.shuffled_answers}
      incorrect_answers = {question.incorrect_answers}
      correct_answer={question.correct_answer}
      selectedAnswer={selectedAnswers[index]}
      onAnswerChange={handleAnswerChange}
      isSubmitted={isSubmitted}
    />
    ))
  return(
    <main>
      {started ? 
      <form className='questions-container' onSubmit={handleSubmit}>
        {questionElements}
        {isSubmitted ? 
          (
          <>
          <div className='answer-count'>Correct Answers: {correctAnswerCount} / {questions.length}</div>
          <button>Play Again</button>
          </>)
          :
          (<button type='submit'>Check Answers</button>)
        }
      </form>
      : <Start handleStartBtn = {handleStartBtn}/>}
    </main>
    )
}