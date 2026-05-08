// app/api/pembayaran/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: Ambil semua metode pembayaran
export async function GET() {
  try {
    const { data, error } = await supabase.from("jenis_pembayaran").select(`
        *,
        detail_jenis_pembayaran (*)
      `);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pembayaran:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pembayaran" },
      { status: 500 },
    );
  }
}

// POST: Konfirmasi pembayaran
export async function POST(request) {
  try {
    const body = await request.json();
    const { id_pemesanan, id_jenis_bayar, bukti_bayar } = body;

    // Update pemesanan dengan metode pembayaran
    const { data, error } = await supabase
      .from("pemesanan")
      .update({
        id_jenis_bayar,
        status_pesan: "Sedang Diproses",
      })
      .eq("id", id_pemesanan)
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      pemesanan: data[0],
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      { error: "Gagal konfirmasi pembayaran" },
      { status: 500 },
    );
  }
}
