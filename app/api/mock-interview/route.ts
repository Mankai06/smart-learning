import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { action, topic, question, answer } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = action === 'question'
    ? `Generate 1 interview question for a fresher applying for a ${topic} role. Just the question, nothing else.`
    : `You are an expert interviewer. Question: "${question}". Candidate's answer: "${answer}". Give honest, helpful feedback in 3 parts: 1) What was good 2) What was missing 3) A better sample answer. Be encouraging but honest.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );

  const data = await res.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Error generating response';
  return NextResponse.json({ result });
}