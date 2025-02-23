import React, { createContext, useState } from "react";
export const datacontext = createContext();

import run from "../gemini";

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    window.speechSynthesis.cancel(); // ✅ Stop any ongoing speech
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";

    text_speak.onend = () => {
      setTimeout(() => recognition.start(), 1000); // ✅ Restart recognition after speaking
    };

    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    setSpeaking(true);

    let text = await run(prompt);
    let newText = text
      .replace(/google/gi, "Palak Sahu")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "");

    setPrompt(newText);
    speak(newText);
    setResponse(true);

    setTimeout(() => {
      setSpeaking(false);
    }, 3000);
  }

  let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.continuous = false; // ✅ Stops listening after one command
  recognition.interimResults = false;
  
  recognition.onstart = () => console.log("Listening...");
  recognition.onend = () => console.log("Stopped Listening...");

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript.toLowerCase();
    setPrompt(transcript);

    takeCommand(transcript);
  };




  function takeCommand(command) {
    
    if (command.includes("stop")) {
        window.speechSynthesis.cancel(); // ✅ Stop Speaking
        recognition.stop(); // ✅ Stop Listening
        setPrompt("Stopped.");
        setSpeaking(false);
        return;
    }

    // ✅ Rinal Knows Its Name & Creator
    if (command.includes("who are you") || command.includes("what is your name") || command.includes("tumhara naam kya hai")) {
      speak("I am Rinal, your virtual assistant.");
      setTimeout(() => setSpeaking(false), 3000);
      return;
    }

    if (command.includes("tumhe kisne banaya") || command.includes("who created you")) {
      speak("I was created by Palak Sahu.");
      setTimeout(() => setSpeaking(false), 3000);
      return;
    }

    if (command.includes("open") && command.includes("youtube")) {
        window.open("https://www.youtube.com/", "_blank");
        speak("Opening YouTube");
  setResponse(true);

        setPrompt("Opening YouTube...");
        setTimeout(() => setSpeaking(false), 3000);
    }

    if (command.includes("open") && command.includes("instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram");
  setResponse(true);

        setPrompt("Opening Instagram...");
        setTimeout(() => setSpeaking(false), 3000);
    }


    if (command.includes("calculator") && command.includes("calculator")) {
      window.open("https://www.desmos.com/scientific", "_blank");
      speak("Opening calculator ");
  setResponse(true);

      setPrompt("Opening calculator...");
      setTimeout(() => setSpeaking(false), 3000);
  }

  
  if (command.includes("whatsapp") && command.includes("whatsapp")) {
    window.open("https://web.whatsapp.com/", "_blank");
    speak("Opening whatsapp ");
  setResponse(true);
    setPrompt("Opening whatsapp...");
    setTimeout(() => setSpeaking(false), 3000);
}


if (command.includes("google") && command.includes("google")) {
  window.open("https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiI2MDf1tmLAxV1XmwGHUvnKqgQPAgI", "_blank");
  speak("Opening google ");
  setResponse(true);
  setPrompt("Opening google...");
  setTimeout(() => setSpeaking(false), 3000);
}

   
// if (command.includes("time") && command.includes("time")) {
//    let time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//    speak(`The time is ${time}`);
//         }  

//         if(command.includes("date") && command.includes("date")) {
//           let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
//           speak(`Today's date is ${date}`);
//         } 

        
        else if(command.includes("time")){
          let time = new Date().toLocaleDateString(undefined,
             { hour: "numeric", minute: "numeric" });
          speak(time)
          setResponse(true)
          setPrompt(time)
          
          setTimeout(() =>{
             setSpeaking(false)
            }, 3000)
           }

        else if(command.includes("date")){
          let date = new Date().toLocaleDateString(undefined,
             { day: "numeric", month: "short", year: "numeric" });
          speak(date)
          setResponse(true)
          setPrompt(date)

          setTimeout(() =>{
             setSpeaking(false)
            }, 3000)

        }



    if (command.includes("play") && command.includes("play")) {
        let songQuery = command.replace("play", "").replace("song", "").trim();
        speak(`Playing ${songQuery} on YouTube.`);
  setResponse(true);
        setPrompt(`Playing ${songQuery}...`);
        window.open(`https://www.youtube.com/results?search_query=${songQuery}`, "_blank");
        setTimeout(() => setSpeaking(false), 3000);
    } else {
        aiResponse(command);
    }
}



  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}


export default UserContext;





