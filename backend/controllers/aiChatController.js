const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handleAIChat  = async (req, res) => {
  const { message } = req.body;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Ты помощник по карьерному развитию. Отвечай на вопросы про резюме, собеседования, soft-skills. Тебе задает вопросы студент, который хочет устроиться на работу. Если не знаешь ответа, просто скажи 'Не знаю' или 'Не могу ответить на этот вопрос'.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({ text: chatResponse.choices[0].message.content });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ text: "Ошибка при обращении к AI" });
  }
};
