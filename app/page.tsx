import AnalyzeInput from './components/AnalyzeInput';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-8">AI Social Analytics Dashboard</h1>
      <AnalyzeInput />
    </main>
  );
}
