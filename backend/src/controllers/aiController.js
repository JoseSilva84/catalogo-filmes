const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;

const getRecommendations = async (req, res) => {
    try {
        if (!genAI) {
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        }

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'O prompt é obrigatório' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const systemInstruction = `
Você é um assistente especialista em filmes. O usuário informará características de um filme que ele deseja assistir (gênero, ano, atores, enredo, emoções, etc).
Sua tarefa é analisar essas características e retornar EXATAMENTE um array JSON contendo ATÉ 20 títulos de filmes que melhor correspondam à descrição. Não inclua texto adicional, markdown ou explicações.
Apenas o array JSON.
Formato esperado: ["Nome do Filme 1", "Nome do Filme 2", "Nome do Filme 3", ..., "Nome do Filme 20"]
        `;

        const finalPrompt = `${systemInstruction}\n\nCaracterísticas desejadas: ${prompt}`;

        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();
        
        let movies = [];
        try {
            // Tenta dar parse na resposta caso venha com blocos de markdown
            const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            movies = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Erro ao fazer parse do JSON:", e, responseText);
            // Fallback: se não for JSON, pegamos as linhas como texto
            movies = responseText.split('\n').map(line => line.replace(/-|\d+\./g, '').trim()).filter(Boolean).slice(0, 20);
        }

        res.json({ recommendations: movies.slice(0, 20) });
    } catch (error) {
        console.error('Erro na API do Gemini:', error.message);
        res.status(500).json({ error: error.message || 'Erro ao gerar recomendações de filmes' });
    }
};

module.exports = {
    getRecommendations
};
