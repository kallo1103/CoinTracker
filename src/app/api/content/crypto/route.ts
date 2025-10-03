import { NextResponse } from 'next/server';
import { getCryptoNews } from '@/lib/getCryptoNews';

// API route dùng lại logic lấy dữ liệu từ lib để tránh trùng lặp
export async function GET() {
  const data = await getCryptoNews();
  return NextResponse.json(data);
}


