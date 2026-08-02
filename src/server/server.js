
//middleware
import express from "express";
import json from "json";
import OpenAI from "openai";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

//setting middleware
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
app.set("view engine", "ejs");
app.use(cors());
dotenv.config()


//API & env
console.log(process.env)
const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const PORT = process.env.PORT;



//AI post request
app.post('/api/chat', async (req, res) => {
    try{
        const { messages } = req.body;
        const response = await openAI.chat.completions.create({
        model: 'gpt-4o-mini', 
        messages: messages,
        });

        const aiResponse = response.choices[0].message;
        console.log(aiResponse);
        res.json(aiResponse);   
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
        console.log(req.body)
    }
});



//default page rendering
app.get("/", async (req, res) =>{
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
})

//default server listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//to start the server: run `npm run devstart` and then in a new terminal, run `npm run dev` and visit localhost 5173
