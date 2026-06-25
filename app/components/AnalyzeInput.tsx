"use client";

import { useState } from 'react';
import type { PostMetric } from '../../lib/schema';

export default function AnalyzeInput({ onAnalysisComplete }: { onAnalysisComplete: (result: any) => void }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PostMetric | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze');
      }

      setResult(data.post); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Analyze Video</h2>
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Paste TikTok URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
      >
        {loading ? 'Analyzing...' : 'Get Insights'}
      </button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      
      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800">Analysis Complete!</h3>
          <p className="text-sm">Views: {result.metrics.views.toLocaleString()}</p>
          <p className="text-sm">Engagement Rate: {result.engagementRate}%</p>
        </div>
      )}
    </div>
  );
}
