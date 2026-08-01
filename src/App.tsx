import { use, useState } from "react";
import "./index.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");

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
        <p>Explain XYZ to me.</p>
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
