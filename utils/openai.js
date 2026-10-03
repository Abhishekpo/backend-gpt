import dotenv from "dotenv"
dotenv.config()

// Headers Meta Dara about the request like label on the box
// body the real content
// method post/get/delete
const getOpenAIAPIResponse = async (message)=> {
        const options={

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
      model : "gpt-4o-mini",
      input: [
      {
        role: "user",
        content: message
      }]
  })
  }

  try{
    // fetch doesn't auto-strinify because it supports multiple data types, and forcing json would reduce flexibility abd break
    // other use cases 
    const response= await fetch("https://api.openai.com/v1/responses", options)

    const data= await response.json();
    if (!response.ok){
        console.log(data)
        throw new Error(data?.error?.message|| "OpenAI request failed")
    }
    return data.output[0].content[0].text
  }
  catch(err){
          console.log(err)
          throw err;
  }
}
export default getOpenAIAPIResponse