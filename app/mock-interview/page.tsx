'use client';
import { useState } from 'react';

const topics = [
  { id: 'webdev', label: 'Web Development', icon: '💻' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'ai', label: 'AI & Machine Learning', icon: '🤖' },
  { id: 'iot', label: 'IoT & Robotics', icon: '🌐' },
  { id: 'dsa', label: 'Data Structures', icon: '📊' },
  { id: 'hr', label: 'HR Interview', icon: '🤝' },
];

export default function MockInterviewPage() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loadingQ, setLoadingQ] = useState(false);
  const [loadingF, setLoadingF] = useState(false);
  const [step, setStep] = useState(1);

  async function getQuestion() {
    if (!selectedTopic) return alert('Please select a topic!');
    setLoadingQ(true);
    setFeedback('');
    setAnswer('');
    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'question', topic: selectedTopic }),
      });
      const data = await res.json();
      setQuestion(data.result);
      setStep(2);
    } catch {
      alert('Error getting question. Check your API key!');
    }
    setLoadingQ(false);
  }

  async function getFeedback() {
    if (!answer.trim()) return alert('Please write your answer first!');
    setLoadingF(true);
    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'feedback', question, answer }),
      });
      const data = await res.json();
      setFeedback(data.result);
      setStep(3);
    } catch {
      alert('Error getting feedback!');
    }
    setLoadingF(false);
  }

  function reset() {
    setStep(1);
    setQuestion('');
    setAnswer('');
    setFeedback('');
    setSelectedTopic('');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl">🤖</span>
          <h1 className="text-3xl font-bold text-teal-800 mt-3">AI Mock Interview</h1>
          <p className="text-gray-500 mt-2">Practice interviews with AI — get instant feedback!</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {['Pick Topic', 'Answer', 'Feedback'].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${step === i + 1 ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>{s}</span>
              {i < 2 && <div className="w-8 h-0.5 bg-gray-300" />}
            </div>
          ))}
        </div>

        {/* Step 1 — Topic Selection */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Choose your interview topic</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {topics.map(t => (
                <button key={t.id} onClick={() => setSelectedTopic(t.label)}
                  className={`p-4 rounded-xl border-2 text-left transition-all
                    ${selectedTopic === t.label ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="text-sm font-semibold text-gray-700">{t.label}</div>
                </button>
              ))}
            </div>
            <button onClick={getQuestion} disabled={loadingQ}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50">
              {loadingQ ? '⏳ Generating Question...' : 'Start Interview →'}
            </button>
          </div>
        )}

        {/* Step 2 — Question & Answer */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-lg mb-6">
              <p className="text-xs text-teal-600 font-semibold mb-1">INTERVIEW QUESTION</p>
              <p className="text-gray-800 text-lg leading-relaxed">{question}</p>
            </div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Answer</label>
            <textarea value={answer} onChange={e => setAnswer(e.target.value)}
              rows={6} placeholder="Type your answer here... think clearly and be specific!"
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-700 focus:border-orange-400 focus:outline-none resize-none mb-6" />
            <div className="flex gap-3">
              <button onClick={reset} className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50">
                ← Start Over
              </button>
              <button onClick={getFeedback} disabled={loadingF}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl disabled:opacity-50">
                {loadingF ? '⏳ Analyzing your answer...' : 'Get AI Feedback →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Feedback */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-lg mb-4">
              <p className="text-xs text-teal-600 font-semibold mb-1">QUESTION</p>
              <p className="text-gray-700">{question}</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg mb-4">
              <p className="text-xs text-orange-600 font-semibold mb-1">YOUR ANSWER</p>
              <p className="text-gray-700">{answer}</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg mb-6">
              <p className="text-xs text-green-600 font-semibold mb-2">🤖 AI FEEDBACK</p>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{feedback}</p>
            </div>
            <button onClick={reset}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-xl">
              Try Another Question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}