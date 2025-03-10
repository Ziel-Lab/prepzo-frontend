import { NextResponse } from 'next/server';

export async function GET() {
  // This endpoint will be used to verify if we have a valid OpenAI key on the server
  const hasKey = !!process.env.OPENAI_API_KEY;
  
  return NextResponse.json({ hasKey }, {
    status: 200,
  });
} 