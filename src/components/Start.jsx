import React, { useState } from 'react';
import Select from 'react-select';

export default function Start(props) {
  const [difficultyDisplay, setDifficultyDisplay] = useState('easy')
  const [typeDisplay, setTypeDisplay] = useState('multiple')
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
    setDifficultyDisplay(selectedOption)
    props.setDifficulty(selectedOption.value);
  }

  const handleTypeChange = (selectedOption) => {
    setTypeDisplay(selectedOption)
    props.setType(selectedOption.value);
  }
  const handleNumberOfQuestionsChange = (event) => {
    const selectedValue = event.target.value
    props.setNumQuestions(selectedValue);
  }
  //custom styles for react-select elements
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      fontWeight: 400, 
      fontSize: '1rem', 
      width: 200,
      height: 50,
      borderRadius: '0.5rem',
      fontFamily: 'Karla'
    }),
  };

  return (
    <div className="start-screen">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <div className='select-container'>
        <input
          className='select-option'
          type='number'
          placeholder='Number of Questions'
          value={props.numQuestions}
          onChange={handleNumberOfQuestionsChange}
        />
        <Select
          placeholder='Select Difficulty'
          className='select-option'
          options={difficulties}
          onChange={handleDifficultyChange}
          value={difficultyDisplay}
          styles={customStyles}
        />
        <Select
          placeholder='Select Type'
          className='select-option'
          options={types}
          onChange={handleTypeChange}
          value={typeDisplay}
          styles={customStyles}
        />
      </div>
      <button onClick={props.handleStartBtn}>Start Quiz</button>
    </div>
  );
}