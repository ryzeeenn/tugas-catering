// app/api/pelanggan/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: Ambil semua pelanggan
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("pelanggan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pelanggan:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pelanggan" },
      { status: 500 },
    );
  }
}

// POST: Register pelanggan baru
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      nama_pelanggan,
      email,
      password,
      tgl_lahir,
      telepon,
      alamat1,
      alamat2,
      alamat3,
    } = body;

    // Validasi
    if (!nama_pelanggan || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 },
      );
    }

    // Cek email sudah ada atau belum
    const { data: existing } = await supabase
      .from("pelanggan")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 },
      );
    }

    // Insert pelanggan baru
    const { data, error } = await supabase
      .from("pelanggan")
      .insert([
        {
          nama_pelanggan,
          email,
          password, // NOTE: Di production, password harus di-hash!
          tgl_lahir,
          telepon,
          alamat1,
          alamat2,
          alamat3,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        pelanggan: data[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering pelanggan:", error);
    return NextResponse.json(
      { error: "Gagal register pelanggan" },
      { status: 500 },
    );
  }
}
