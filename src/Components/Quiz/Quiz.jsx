import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import { data } from './data';

const Quiz = () => {
  let [index, setIndex] = useState(0); // Start from the first question
  let [correct, setCorrect] = useState(null); // Track correct or wrong
  const answerRefs = useRef([]); // To store references to the <li> elements

  const checkAnswer = (e, ans) => {
    if (correct === null) { // Allow checking answer only once
      if (ans === data[index].ans) {
        e.target.classList.add('correct');
        setCorrect(true);
      } else {
        e.target.classList.add('wrong');
        setCorrect(false);
      }
    }
  };

  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1); // Move to the next question
      setCorrect(null); // Reset for the next question
    } else {
      alert('Quiz Completed');
    }
  };

  useEffect(() => {
    // Reset the classes of the answer options when the question changes
    answerRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.remove('correct', 'wrong');
      }
    });
  }, [index]);

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      <h2>{index + 1}. {data[index].question}</h2>
      <ul>
        <li ref={(el) => (answerRefs.current[0] = el)} onClick={(e) => checkAnswer(e, 1)}>
          {data[index].option1}
        </li>
        <li ref={(el) => (answerRefs.current[1] = el)} onClick={(e) => checkAnswer(e, 2)}>
          {data[index].option2}
        </li>
        <li ref={(el) => (answerRefs.current[2] = el)} onClick={(e) => checkAnswer(e, 3)}>
          {data[index].option3}
        </li>
        <li ref={(el) => (answerRefs.current[3] = el)} onClick={(e) => checkAnswer(e, 4)}>
          {data[index].option4}
        </li>
      </ul>
      <button onClick={handleNext}>Next</button>
      <div className='loader'>{index + 1} of {data.length} Questions</div>
    </div>
  );
};

export default Quiz;
