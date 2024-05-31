const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config();

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const chat = model.startChat({ generationConfig });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const promptUser = async () => {
        rl.question("Your message: ", async (message) => {
            try {
                const result = await chat.sendMessage(message);
                const response = result.response.text();
                console.log(response);
            } catch (error) {
                console.error("Error:", error.message);
            }
            promptUser();
        });
    };

    promptUser();
}

runChat();
