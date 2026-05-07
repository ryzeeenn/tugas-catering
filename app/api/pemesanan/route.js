// app/api/pemesanan/route.js
import { NextResponse } from 'next/server';
import { createPemesanan, getPemesananWithDetails } from '@/lib/database';

// GET - Ambil semua pemesanan dengan detail
export async function GET() {
  try {
    const pemesanan = await getPemesananWithDetails();
    return NextResponse.json(pemesanan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data pemesanan' },
      { status: 500 }
    );
  }
}

// POST - Buat pemesanan baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { pemesananData, detailData } = body;
    
    const result = await createPemesanan(pemesananData, detailData);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating pemesanan:', error);
    return NextResponse.json(
      { error: 'Gagal membuat pemesanan' },
      { status: 500 }
    );
  }
}