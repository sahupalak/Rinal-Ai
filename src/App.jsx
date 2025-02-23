import React, { useContext } from 'react';
import './App.css';
import './index.css';
import va from './assets/ai.png';
import { CiMicrophoneOn } from 'react-icons/ci';
import { datacontext } from './context/UserContext';
import speakingGif from './assets/speak.gif';
import aigif from './assets/aiVoice.gif';

function App() {
  const { recognition , speaking , setSpeaking , prompt , response ,setPrompt , setResponse} = useContext(datacontext);

  return (
    <div className='main'>
      <img src={va} alt='Rinal' id='Rinal' />
      <span>I'm Rinal, Your Advanced Virtual Assistant</span>
      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("listening...")
            setSpeaking(true)
            setResponse(false)
            recognition.start();
          }}
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className='response'>
        { !response ? 
          <img src={speakingGif} alt='' id='speak-icon' />
          :
          <img src={aigif} alt='' id='aigif' />
         }
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
