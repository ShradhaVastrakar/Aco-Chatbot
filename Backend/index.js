import { Configuration, OpenAIApi } from "openai"
import express from "express"
import dotenv from "dotenv"
import cors from "cors";

dotenv.config()

const app = express();


app.use(express.json())
app.use(cors());


const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.APIKEY
})

const openai = new OpenAIApi(configuration);

app.get("/", (req,res) => {
  res.send("welcome to Aco chatbot")
})

app.post("/chat", async (req, res) => {
    const { chats } = req.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `${chats}`
            }
        ]
    });

    res.json({
          output: result.data.choices[0].message,
        });
})

// app.post("/search/:section",async (req,res) => {
//  const {section} = req.params;

//  const result = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages : [{role: "user", content: `Give me 5 interview question of ${section}`}]
//  });

//  let data = result.data.choices[0].message.content;
//  let splitData = data.split("\n");
//  res.send(splitData)
// })

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})


