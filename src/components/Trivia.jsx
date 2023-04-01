import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import play from '../assets/sounds/src_sounds_play.mp3';
import correct from '../assets/sounds/src_sounds_correct.mp3';
import wrong from '../assets/sounds/src_sounds_wrong.mp3';

const Trivia = ({ data, setTimeOut, questionNumber, setQuestionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState('answer');
  const [startGame] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (ans) => {
    setSelectedAnswer(ans);
    setClassName('answer selected');

    delay(3000, () => {
      setClassName(ans.correct ? 'answer correct' : 'answer wrong');
    });

    delay(5000, () => {
      if (ans.correct) {
        correctAnswer();
        delay(100, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
      }
    });
  };
  // setQuestionNumber(questionNumber + 1);

  return (
    <div className='trivia'>
      <div className='question'>{question?.question}</div>
      <div className='answers'>
        {question?.answers.map((ans) => (
          <div
            key={ans.id}
            className={selectedAnswer === ans ? className : 'answer'}
            onClick={() => !selectedAnswer && handleClick(ans)}
          >
            {ans.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
