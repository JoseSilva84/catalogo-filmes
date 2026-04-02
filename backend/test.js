require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
    try {
        console.log("Key:", process.env.GEMINI_API_KEY);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log("Calling model...");
        const result = await model.generateContent("hello");
        console.log("Success:", result.response.text());
    } catch(e) {
        console.error("FAILED:", e.message);
    }
}
run();
