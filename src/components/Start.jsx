import { useRef } from 'react';

const Start = ({ setUsername }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className='start'>
      <input
        type='text'
        className='startInput'
        ref={inputRef}
        placeholder='Enter Your Name'
        required
      />
      <button className='startButton' onClick={handleClick}>
        Start
      </button>
    </div>
  );
};

export default Start;
