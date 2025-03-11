import { NextResponse } from 'next/server';
import { getHumeAccessToken } from '@/utlis/utils/getHumeAccessToken';

export async function GET() {
  try {
    const accessToken = await getHumeAccessToken();

    if (!accessToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Failed to get Hume access token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify({ accessToken }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error getting Hume access token:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Enable CORS
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers });
}
