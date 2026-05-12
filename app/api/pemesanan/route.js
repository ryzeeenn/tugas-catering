// app/api/pemesanan/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// ✅ GET: Ambil semua data pemesanan (untuk Admin Dashboard)
export async function GET() {
  try {
    console.log('🔍 Fetching pemesanan...');
    
    const { data: pemesanan, error } = await supabase
      .from('pemesanan')
      .select(`
        *,
        pelanggan (nama_pelanggan, email, telepon),
        jenis_pembayaran (metode_pembayaran),
        detail_pemesanan (
          *,
          paket (nama_paket, harga_paket, jenis)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    console.log('✅ Data fetched:', pemesanan?.length || 0, 'records');
    return NextResponse.json(pemesanan || []);
    
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ POST: Buat pemesanan baru (sudah kamu punya)
export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.id_pelanggan || !body.no_resi || !body.detail_pemesanan) {
      return NextResponse.json(
        { error: 'Data pemesanan tidak lengkap.' },
        { status: 400 }
      );
    }

    const { data: pemesananData, error: pemesananError } = await supabase
      .from('pemesanan')
      .insert([{
        id_pelanggan: parseInt(body.id_pelanggan),
        id_jenis_bayar: parseInt(body.id_jenis_bayar) || null,
        no_resi: body.no_resi,
        total_bayar: parseInt(body.total_bayar),
        status_pesan: body.status_pesan || 'Menunggu Konfirmasi'
      }])
      .select();

    if (pemesananError) {
      console.error('Supabase Insert Error:', pemesananError);
      return NextResponse.json({ error: pemesananError.message }, { status: 500 });
    }

    if (!pemesananData || pemesananData.length === 0) {
      return NextResponse.json({ error: 'Gagal menyimpan data pemesanan.' }, { status: 500 });
    }

    const newOrderId = pemesananData[0].id;

    const details = body.detail_pemesanan.map(item => ({
      id_pemesanan: newOrderId,
      id_paket: parseInt(item.id_paket),
      subtotal: parseInt(item.subtotal)
    }));

    const { error: detailError } = await supabase
      .from('detail_pemesanan')
      .insert(details);

    if (detailError) {
      console.error('Supabase Detail Error:', detailError);
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