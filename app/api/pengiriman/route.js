    // app/api/pengiriman/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET: Ambil semua pengiriman dengan detail pemesanan
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('pengiriman')
      .select(`
        *,
        pemesanan (
          no_resi,
          total_bayar,
          pelanggan (
            nama_pelanggan,
            telepon,
            alamat1,
            alamat2,
            alamat3
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching pengiriman:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data pengiriman' },
      { status: 500 }
    );
  }
}

// POST: Buat data pengiriman baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { id_pesan, tgl_kirim } = body;

    const { data, error } = await supabase
      .from('pengiriman')
      .insert([{
        id_pesan,
        tgl_kirim,
        status_kirim: 'Sedang Dikirim'
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      pengiriman: data[0] 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating pengiriman:', error);
    return NextResponse.json(
      { error: 'Gagal membuat data pengiriman' },
      { status: 500 }
    );
  }
}

// PUT: Update status pengiriman
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status_kirim, tgl_tiba, bukti_foto } = body;

    const { data, error } = await supabase
      .from('pengiriman')
      .update({
        status_kirim,
        tgl_tiba,
        bukti_foto
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      pengiriman: data[0] 
    });

  } catch (error) {
    console.error('Error updating pengiriman:', error);
    return NextResponse.json(
      { error: 'Gagal update status pengiriman' },
      { status: 500 }
    );
  }
}