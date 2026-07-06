import React, {
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';


import ReactMarkdown from "react-markdown";

import "../stylesheets/sidbanai.css";

import remarkGfm from "remark-gfm";

import {FiCopy,FiCheck} from "react-icons/fi";

import SidbanAILogo from "../components/SidbanAILogo";

import { IoClose } from "react-icons/io5";
import { SidbanMoviesContext } from '../context/SidbanMoviesContext';
import { GiFilmSpool } from 'react-icons/gi';

export default function SidbanAI() {

  const [copied, setCopied] = useState(false);

  const {aiResponse,openSidbanAI,setOpenSidbanAI,aiLoading} = useContext(SidbanMoviesContext);

  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);


  const delay = (ms) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

 

  const streamText = useCallback(
    async (text = "") => {

      const words =String(text).split(" ");

      let currentText = "";

      for (let i = 0;i < words.length;i++) {

        currentText +=(i === 0 ? "" : " ") + words[i];

        const updatedText =currentText;

        setMessages((prev) => {

          const updated = [...prev];

          const last = updated[ updated.length - 1];

          if ( last &&last.type === "ai") {

            updated[updated.length - 1] = {

              type: "ai",

              text: updatedText
            };

          } else {

            updated.push({

              type: "ai",

              text: updatedText
            });
          }

          return updated;
        });

        await delay(50);
      }
    },
    []
  );



  useEffect(() => {

    if (aiResponse) {

      const handleIncomingResponse =
        async () => {

          setMessages([]);

          setIsTyping(true);

          await delay(3000);

          setIsTyping(false);

          await streamText(
            aiResponse
          );
        };

      handleIncomingResponse();
    }

  }, [aiResponse, streamText]);



  const highlightWords = (node) => {

    if ( typeof node === "string") {

      return node.split(/(Sid|Ban)/g).map((word, i) => {

          if (word === "Sid") {

            return (

              <span
                key={i}
                style={{
                  color: "red",
                  fontWeight: "bold"
                }}
              >

                Sid

              </span>
            );
          }

          if (word === "Ban") {

            return (

              <span key={i}
               style={{
                  color: "white",
                  fontWeight: "bold"
                }}
              >

                Ban

              </span>
            );
          }

          return word;
        });
    }

    return node;
  };

  
  const copyToClipboard =
    async () => {

      try {

        await navigator.clipboard.writeText(
          aiResponse
        );

        setCopied(true);

        setTimeout(() => {

          setCopied(false);

        }, 2000);

      } catch (err) {

        console.error(
          "Copy failed",
          err
        );
      }
    };


  function handleOnCloseSidbanAI() {

    setOpenSidbanAI(false);

    setTimeout(() => {

      setMessages([]);

    }, 900);
  }

  return (

    <>

      <div className={ openSidbanAI ? "aiChatDiv": "aiChatDivClose"}>

        <IoClose className="closeButton" onClick={ handleOnCloseSidbanAI }/>

        <SidbanAILogo />
        

        <div className="chatMessagesContainer">

          {messages.map(
            (msg, index) => (

              <div key={index} className={`aiChatMessage ${msg.type === "user"? "userMessage": ""}`} >

                <ReactMarkdown

                  remarkPlugins={[ remarkGfm]}

                  components={{

                  

                    p({ children}) {

                      return (

                        <div>

                          {React.Children.map(children,
                            ( child) =>
                              highlightWords(
                                child
                              )
                          )}

                        </div>
                      );
                    },


                    li({children}) {

                      return (

                        <li>

                          {React.Children.map(
                            children,
                            (
                              child
                            ) =>
                              highlightWords(
                                child
                              )
                          )}

                        </li>
                      );
                    },

           

                    img({src, alt}) {

                      return (
                       <div className="sidbanAIImageDiv"> 
    
                       <div className="sidbanCinemaAILogo">Sid<span className='banText'>ban</span>Cinema<GiFilmSpool style={{color:"red",fontSize:"1.2rem"}}/></div>

                       <img src={src || "/SidbanCinemaBack.png"} alt={alt || "sidban-cinema"} className="sidbanAIImage" onError={(e) => { e.target.onerror = null; e.target.src = "/SidbanCinemaBack.png"; }} /> 
                        </div>
            )},
                  
                      

                    

                    a({href,children}) {

                      let text =children;

                      if (

                        typeof href ==="string" &&

                        href.includes( "sidbanai.onrender.com")

                      ) {

                        text = "SidbanAI";
                      }

                      if (

                        typeof href ===
                          "string" &&

                        href.includes(
                          "sidban-portfolio.onrender.com"
                        )

                      ) {

                        text =
                          "Sidban Portfolio";
                      }

                      return (

                        <a

                          href={href}

                          target="_blank"

                          rel="noopener noreferrer"

                          className="sidbanAILink"
                        >

                          {text}

                        </a>
                      );
                    }
                  }}
                >

                  {msg.text}

                </ReactMarkdown>

              </div>
            )
          )}

          {(aiLoading ||
            isTyping) && (

            <div className="aiChatMessage typing">

              <span
                style={{
                
                  color: "white",
                  fontWeight:
                    "lighter"
                }}
              >
                Sid
              </span>

              <span
                className="banTexts"
                style={{
                
                  color: "red",
                  fontWeight:
                    "lighter"
                }}
              >
                ban
              </span>

              AI is typing...

            </div>
          )}

        </div>

        {aiResponse &&
          !isTyping && (

            <button
              className="copyBtn"
              onClick={
                copyToClipboard
              }
            >

              {copied
                ? <FiCheck />
                : <FiCopy />
              }

            </button>
          )}

      </div>

    </>
  );
}