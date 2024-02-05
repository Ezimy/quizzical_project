import React, { useState } from 'react';
import Select from 'react-select';

export default function Start(props) {
  const [difficulty, setDifficulty] = useState('easy')
  const [type, setType] = useState('multiple')
  const [userInput, setUserInput] = useState(0)
  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]

  const types = [
    { value: 'multiple', label: 'Multiple Choice' },
    { value: 'boolean', label: 'True/False' }
  ]

  const handleDifficultyChange = (selectedOption) => {
    setDifficulty(selectedOption)
    props.setDifficulty(selectedOption.value);
  }

  const handleTypeChange = (selectedOption) => {
    setType(selectedOption)
    props.setType(selectedOption.value);
  }
  const handleNumberOfQuestionsChange = (event) => {
    const selectedValue = event.target.value
    setUserInput(selectedValue)
    props.setNumQuestions(event.target.value);
  }

  return (
    <div className="start-screen">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <div className='select-container'>
        <input
          className='select-option'
          type='number'
          placeholder='Number of Questions'
          value={userInput}
          onChange={handleNumberOfQuestionsChange}
        />
        <Select className='select-option' options={difficulties} onChange={handleDifficultyChange} value={difficulty} />
        <Select className='select-option' options={types} onChange={handleTypeChange} value={type} />
      </div>
      <button onClick={props.handleStartBtn}>Start Quiz</button>
    </div>
  );
}