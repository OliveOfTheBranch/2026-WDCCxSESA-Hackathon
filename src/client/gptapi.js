const baseURL = 'http://localhost:6767'


//make a call to the API to generate a question based on a prompt. returns the answer in JSON ( i think)
export async function fetchGPTQuestion(p){
  try{
    const payload = {
      messages: [
        { role: 'system', content: 'Generate a flashcard-like question for this prompt in 3 sentences or less' },
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
        { role: 'system', content: 'give a 1 - 10 rating on the accuracy of the answer provided in comparison to the question. explain in max 30 words why, but use way less than 30 words if you can' },
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