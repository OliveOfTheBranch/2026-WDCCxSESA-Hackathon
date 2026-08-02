const baseURL = 'http://localhost:6767'


//make a call to the API to generate a question based on a prompt. returns the answer in JSON ( i think)
export async function fetchGPTQuestion(p){
  try{
    const payload = {
      messages: [
        { role: 'system', content: 'Generate a random flashcard-like question for this subject in 3 sentences or less' },
        { role: 'user', content: p },
      ],
    };

    const res = await fetch(baseURL +'/api/chat', {
        method: 'POST',
        headers: {
                "Content-Type": 'application/json'
                
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    console.log(data)
    return(data.content)
  }
  catch(error){
    console.error("payload client (gptapi.js) error:" + error)
    return({
      body: JSON.stringify(error)
    })
  }
  

}

//makes a call to the API to critique the correctness of an answer. you need to provide the question and the answer.
export async function verifyGPTAnswer(question, answer){
  try{
     const payload = {
      messages: [
        { role: 'system', content: 'Give a fair critique on the answer by considering what the question asked, and suggest some further points that the user could investigate, while attempting to stay under 30 words. You can include compliments to the users answer.' },
        { role: 'user', content: ( 'Question: ' + question + 'Answer: ' + answer)},
      ],
    };

    const res = await fetch(baseURL +'/api/chat', {
        method: 'POST',
        headers: {
                "Content-Type": 'application/json'
                
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    console.log(data)
    return(data.content)
  }
  catch(error){
    console.error("payload client (gptapi.js) error:" + error)
    return({
      body: JSON.stringify(error)
    })
  }
 

}