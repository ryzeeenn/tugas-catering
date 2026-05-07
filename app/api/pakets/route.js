// app/api/pakets/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

//  GET: Ambil semua data paket dari database
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('paket')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Return langsung array data agar kompatibel dengan fetch di frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching pakets:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data paket' },
      { status: 500 }
    );
  }
}

// 🟡 POST: Tambah paket baru ke database
export async function POST(request) {
  try {
    const body = await request.json();
    const { nama_paket, jenis, kategori, jumlah_pax, harga_paket, deskripsi } = body;

    // Validasi data wajib
    if (!nama_paket || !jenis || !kategori || !jumlah_pax || !harga_paket) {
      return NextResponse.json(
        { error: 'Data tidak lengkap. Pastikan semua field terisi.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('paket')
      .insert([{ nama_paket, jenis, kategori, jumlah_pax, harga_paket, deskripsi }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error('❌ Error creating paket:', error);
    return NextResponse.json(
      { error: 'Gagal menambah paket baru' },
      { status: 500 }
    );
  }
}