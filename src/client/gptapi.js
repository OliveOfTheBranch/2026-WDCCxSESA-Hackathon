const baseURL = 'http://localhost:6767'

export async function fetchGPTQuestion(p){
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


export async function verifyGPTAnswer(question, answer){
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