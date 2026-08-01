import { useState } from "react";
import "./index.css";

function App() {
  const [answer, setAnswer] = useState("");

  const handleChangeAnswer = (event: any) => {
    setAnswer(event.target.value);
  };

  return (
    <>
      <section className="flex-1 place-items-center">
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
