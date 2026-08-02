import { useEffect, useMemo, useRef, useState } from "react";
import bgImg from "../assets/Sprite-0003.png";
import "./index.css";
// @ts-ignore
import { fetchGPTQuestion, verifyGPTAnswer } from "./gptapi.js";

function App() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [aiCritique, setAiCritique] = useState("");

  const [showCritique, setShowCritique] = useState(false);

  const searchParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const givenSubject = searchParams.get("subject") || "";
  if (givenSubject) localStorage.setItem("subject", givenSubject);

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      fetchGPTQuestion(
        "Ask me a short random question about " +
          localStorage.getItem("subject"),
      ).then((result: string) => setQuestion(result));
      hasRun.current = true;
    }
  }, []);

  const handleChangeAnswer = (event: any) => {
    setAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    setAiCritique(verifyGPTAnswer(String(question), answer));
    console.log(question);
    console.log(answer);
    setShowCritique(true);
  };

  return (
    <>
      <div
        className="flex min-h-screen items-center justify-center bg-gray-100 p-4 bg-cover bg-center h-screen bg-contain"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="max-w-130 bg-[#fffdd0] border-4 border-[#e0deb4] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {!givenSubject ? (
            <>
              <h2 className="text-xl py-2.5 font-bold text-gray-800">
                Time to Study!
              </h2>
              <p className="mt-2 text-gray-600">
                Answer this question before you can continue scrolling.
              </p>

              <br />
              <section>
                <p>{question || "Loading question..."}</p>
                <textarea
                  id="answerToAI"
                  className="bg-white border-2 border-black p-1 w-full"
                  rows={3}
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={handleChangeAnswer}
                />
                <br />
                <button
                  className="bg-white border-2 border-[#e0deb4] px-2 pt-1 align-middle"
                  onClick={handleSubmitAnswer}
                >
                  SUBMIT
                </button>
                {showCritique && (
                  <>
                    <hr className="my-4 h-0.5 bg-[#e0deb4] border-0" />
                    <p>{aiCritique}</p>
                  </>
                )}
              </section>
            </>
          ) : (
            <>
              <h2 className="text-xl py-2.5 font-bold text-gray-800">
                Subject Set!
              </h2>
              <p className="mt-2 text-gray-600">
                Next time you're scrolling, we'll ask you questions about{" "}
                {localStorage.getItem("subject")}.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
