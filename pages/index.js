import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    setLoading(true);
    setImageUrl('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setImageUrl(data.imageUrl);
    setLoading(false);
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>📚 Book Visualizer AI</h1>
      <textarea
        placeholder="Describe your book scene here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%', marginTop: 10 }}
      />
      <button
        onClick={generateImage}
        disabled={loading || !prompt}
        style={{
          marginTop: 10,
          padding: '0.5rem 1rem',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          style={{ marginTop: 20, maxWidth: '100%', borderRadius: '8px' }}
        />
      )}
    </div>
  );
}
