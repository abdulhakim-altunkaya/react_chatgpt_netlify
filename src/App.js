import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  let [promptInput, setPromptInput] = useState("");
  let [response, setResponse] = useState("hello");

  const api = process.env.REACT_APP_CHATGPT_API;
  const configuration = new Configuration({
    apiKey: api
  });
  const openai = new OpenAIApi(configuration);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await openai.createCompletion({
      prompt: promptInput,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
    })
    const message = response.data.choices[0].text
    setResponse(message);
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="promptInput" value={promptInput}
        onChange={(e) => setPromptInput(e.target.value)} />
        <button>SUBMIT</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App;