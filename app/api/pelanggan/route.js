// app/api/pelanggan/route.js
import { NextResponse } from 'next/server';
import { getPelanggans, registerPelanggan } from '@/lib/database';

// GET - Ambil semua pelanggan
export async function GET() {
  try {
    const pelanggan = await getPelanggans();
    return NextResponse.json(pelanggan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data pelanggan' },
      { status: 500 }
    );
  }
}

// POST - Register pelanggan baru
export async function POST(request) {
  try {
    const body = await request.json();
    
    const newPelanggan = await registerPelanggan(body);
    
    return NextResponse.json(newPelanggan, { status: 201 });
  } catch (error) {
    console.error('Error registering pelanggan:', error);
    return NextResponse.json(
      { error: 'Gagal register pelanggan' },
      { status: 500 }
    );
  }
}