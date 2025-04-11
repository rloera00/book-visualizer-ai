export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();

    if (!data?.data?.[0]?.url) {
      throw new Error('No image returned from OpenAI');
    }

    const imageUrl = data.data[0].url;
    return res.status(200).json({ imageUrl });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Something went wrong generating the image.' });
  }
}
