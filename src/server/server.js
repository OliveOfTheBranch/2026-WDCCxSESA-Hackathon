
//middleware
const { json } = require("body-parser");
const express = require("express");
const {OpenAI} = require('openai'); 
require('dotenv').config();
const cors = require("cors");

//setting middleware
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(cors());

//API & env
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const PORT = process.env.PORT;



//AI post request
app.post('/api/chat', async (req, res) => {
    try{
        const { messages } = req.body;
        const response = await openai.chat.completions.create({
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
    res.render('main.ejs');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});