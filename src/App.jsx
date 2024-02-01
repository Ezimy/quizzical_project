import React, { useState, useEffect } from 'react';
import Start from '/src/components/Start.jsx';
import Question from '/src/components/Question.jsx';
import { decode } from 'html-entities';
import '/src/index.css';

export default function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([])

  useEffect(() => {

    // Set the body style based on whether Start is rendered
    document.body.style.justifyContent = started ? 'flex-start' : 'center';

    // Cleanup the style when the component unmounts
    return () => {
      document.body.style.justifyContent = 'initial';
    };
  }, [started]);

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
  function shuffleArray(array) {
    // Function to shuffle an array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const questionElements = questions.map((question, index) => (
    <Question
      key={index}
      id={index}
      question={decode(question.question)}
      shuffled_answers={question.shuffled_answers}
      incorrect_answers = {question.incorrect_answers}
      correct_answer={question.correct_answer}
    />
  ));
  return(
    <main>
      {started ? 
      <form className='questions-container'>
        {questionElements}
        <button>Check Answers</button>
      </form>
      : <Start handleStartBtn = {handleStartBtn}/>}
    </main>
    )
}