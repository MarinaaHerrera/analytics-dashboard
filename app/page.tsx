'use client';
import { useState } from 'react';
import AnalyzeInput from './components/AnalyzeInput';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [data, setData] = useState<any>(null);

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>AI Social Analytics Dashboard</h1>
      <p>Analyze your TikTok videos below:</p>
      
      <div style={{ marginTop: '20px' }}>
        <AnalyzeInput onAnalysisComplete={(result: any) => setData(result)} />
      </div>

      {data && (
        <div style={{ marginTop: '40px', height: '300px', width: '100%' }}>
          <h3>Analysis Visualization</h3>
          <ResponsiveContainer>
            <LineChart data={[{ name: 'Video', views: data.views }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </main>
  );
}
