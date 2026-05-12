// app/api/pemesanan/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// POST: Buat pemesanan baru
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Pastikan semua data wajib ada
    if (!body.id_pelanggan || !body.no_resi || !body.detail_pemesanan) {
      return NextResponse.json(
        { error: 'Data pemesanan tidak lengkap.' },
        { status: 400 }
      );
    }

    // 1. Insert ke tabel PEMESANAN
    const { data: pemesananData, error: pemesananError } = await supabase
      .from('pemesanan')
      .insert([{
        id_pelanggan: parseInt(body.id_pelanggan), // Paksa jadi Integer
        id_jenis_bayar: parseInt(body.id_jenis_bayar) || null, // Boleh null (nanti diganti)
        no_resi: body.no_resi,
        total_bayar: parseInt(body.total_bayar),
        status_pesan: body.status_pesan || 'Menunggu Konfirmasi'
      }])
      .select(); // Penting: agar kita tahu ID yang baru dibuat

    if (pemesananError) {
      console.error('Supabase Insert Error:', pemesananError);
      return NextResponse.json({ error: pemesananError.message }, { status: 500 });
    }

    if (!pemesananData || pemesananData.length === 0) {
      return NextResponse.json({ error: 'Gagal menyimpan data pemesanan.' }, { status: 500 });
    }

    const newOrderId = pemesananData[0].id;

    // 2. Insert ke tabel DETAIL_PEMESANAN
    const details = body.detail_pemesanan.map(item => ({
      id_pemesanan: newOrderId,
      id_paket: parseInt(item.id_paket), // Paksa jadi Integer
      subtotal: parseInt(item.subtotal)
    }));

    const { error: detailError } = await supabase
      .from('detail_pemesanan')
      .insert(details);

    if (detailError) {
      console.error('Supabase Detail Error:', detailError);
      // Opsional: Hapus pesanan utama jika detail gagal (manual cleanup)
      await supabase.from('pemesanan').delete().eq('id', newOrderId);
      return NextResponse.json({ error: 'Gagal menyimpan detail pesanan.' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      data: pemesananData[0] 
    }, { status: 201 });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}