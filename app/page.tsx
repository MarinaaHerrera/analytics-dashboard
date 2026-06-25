import AnalyzeInput from './components/AnalyzeInput';

export default function Home() {
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>AI Social Analytics Dashboard</h1>
      <p>Analyze your TikTok videos below:</p>
      <div style={{ marginTop: '20px' }}>
        <AnalyzeInput />
      </div>
    </main>
  );
}
