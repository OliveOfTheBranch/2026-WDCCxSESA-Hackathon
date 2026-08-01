import { useMemo, useState } from "react";
import bgImg from "./assets/Sprite-0003.png";
import "./index.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");

  const searchParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, [window.location.search]);

  const givenSubject = searchParams.get("subject") || "";
  if (givenSubject) localStorage.setItem("subject", givenSubject);

  const handleChangeAnswer = (event: any) => {
    setAnswer(event.target.value);
  };

  const handleChangeSubject = (event: any) => {
    setSubject(event.target.value);
  };

  const handleSaveSubject = () => {
    localStorage.setItem("subject", subject);
  };

  return (
    <>
      <div
        className="flex min-h-screen items-center justify-center bg-gray-100 p-4 bg-cover bg-center h-screen bg-contain"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="w-full max-w-[520px] rounded-2xl bg-white/75 p-6 shadow-xl">
          <h2 className="text-xl py-[10px] font-bold text-gray-800">
            Time to Study!
          </h2>
          <p className="mt-2 text-gray-600">
            Answer this question before you can continue scrolling.
          </p>
        </div>
      </div>
      <section>
        <p>What do you want to learn about?</p>
        <input
          placeholder="Type your preferred subject here..."
          value={subject}
          onChange={handleChangeSubject}
        />
        <button onClick={handleSaveSubject}>Submit</button>
        <button onClick={() => alert(localStorage.getItem("subject"))}>
          Test
        </button>
      </section>
      <br />
      <section>
        <p>Explain {localStorage.getItem("subject")} to me.</p>
        <input
          placeholder="Type your answer here..."
          value={answer}
          onChange={handleChangeAnswer}
        />
        <button onClick={() => alert(answer)}>Submit</button>
      </section>
    </>
  );
}

export default App;
