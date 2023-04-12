const { Configuration, OpenAIApi } = require("openai");

const motivationalQuote = async (req, res) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate a motivational quote",
      max_tokens: 50,
      temperature: 0,
      top_p: 1.0,

    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text
    });
  } catch (error) {
    console.error('Failed to generate quote:', error);
    return res.status(500).json({ error: 'Failed to generate quote' });
  }
};

module.exports = motivationalQuote;
