import React, { useState } from 'react';
import Start from '/src/components/Start.jsx';
import Quiz from '/src/components/Quiz';
import '/src/index.css';

function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([])
  function fetchQuestions(){
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => console.log(data))
  }
  function handleStartBtn(){
    setStarted(true)
    fetchQuestions()
  }
  return(
    <main>
      {started ? <Quiz /> : <Start handleStartBtn = {handleStartBtn}/>}
    </main>
    )
}

export default App;