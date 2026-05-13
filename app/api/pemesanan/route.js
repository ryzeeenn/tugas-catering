// app/api/pemesanan/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// ============================================
// GET: Ambil semua data pemesanan
// ============================================
export async function GET() {
  try {
    const { data: pemesanan, error } = await supabase
      .from("pemesanan")
      .select(
        `
        *,
        pelanggan (nama_pelanggan, email, telepon),
        jenis_pembayaran (metode_pembayaran),
        detail_pemesanan (
          *,
          paket (nama_paket, harga_paket, jenis)
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      throw error;
    }

    return NextResponse.json(pemesanan || []);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pemesanan" },
      { status: 500 },
    );
  }
}

// ============================================
// POST: Buat pemesanan baru
// ============================================
export async function POST(request) {
  try {
    const body = await request.json();

    // Validasi data wajib
    if (!body.id_pelanggan || !body.no_resi || !body.detail_pemesanan) {
      return NextResponse.json(
        { error: "Data pemesanan tidak lengkap." },
        { status: 400 },
      );
    }

    // 1. Insert ke tabel PEMESANAN
    const { data: pemesananData, error: pemesananError } = await supabase
      .from("pemesanan")
      .insert([
        {
          id_pelanggan: parseInt(body.id_pelanggan),
          id_jenis_bayar: parseInt(body.id_jenis_bayar) || null,
          no_resi: body.no_resi,
          total_bayar: parseInt(body.total_bayar),
          status_pesan: body.status_pesan || "Menunggu Konfirmasi",
        },
      ])
      .select();

    if (pemesananError) {
      console.error("Supabase Insert Error:", pemesananError);
      return NextResponse.json(
        { error: pemesananError.message },
        { status: 500 },
      );
    }

    if (!pemesananData || pemesananData.length === 0) {
      return NextResponse.json(
        { error: "Gagal menyimpan data pemesanan." },
        { status: 500 },
      );
    }

    const newOrderId = pemesananData[0].id;

    // 2. Insert ke tabel DETAIL_PEMESANAN
    const details = body.detail_pemesanan.map((item) => ({
      id_pemesanan: newOrderId,
      id_paket: parseInt(item.id_paket),
      subtotal: parseInt(item.subtotal),
    }));

    const { error: detailError } = await supabase
      .from("detail_pemesanan")
      .insert(details);

    if (detailError) {
      console.error("Supabase Detail Error:", detailError);
      // Cleanup: hapus pesanan jika detail gagal
      await supabase.from("pemesanan").delete().eq("id", newOrderId);
      return NextResponse.json(
        { error: "Gagal menyimpan detail pesanan." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: pemesananData[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ============================================
// PUT: Update status pemesanan
// ============================================
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status_pesan } = body;

    // Validasi
    if (!id || !status_pesan) {
      return NextResponse.json(
        { error: "ID dan status wajib diisi" },
        { status: 400 },
      );
    }

    // Update status di database
    const { data, error } = await supabase
      .from("pemesanan")
      .update({
        status_pesan,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Pemesanan tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: "Status berhasil diupdate",
    });
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json(
      { error: "Gagal update status pemesanan" },
      { status: 500 },
    );
  }
}
