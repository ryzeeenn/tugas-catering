// lib/database.js
import { supabase } from './supabaseClient';

// ==================== PAKET ====================
export async function getPakets() {
  const { data, error } = await supabase
    .from('paket')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getPaketById(id) {
  const { data, error } = await supabase
    .from('paket')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// ==================== PELANGGAN ====================
export async function getPelanggans() {
  const { data, error } = await supabase
    .from('pelanggan')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function registerPelanggan(pelangganData) {
  const { data, error } = await supabase
    .from('pelanggan')
    .insert([pelangganData])
    .select();
  
  if (error) throw error;
  return data;
}

// ==================== PEMESANAN ====================
export async function getPemesananWithDetails() {
  const { data, error } = await supabase
    .from('pemesanan')
    .select(`
      *,
      pelanggan:pelanggan(nama_pelanggan, email, telepon),
      jenis_pembayaran:jenis_pembayaran(metode_pembayaran),
      detail_pemesanan:detail_pemesanan(
        *,
        paket:paket(nama_paket, harga_paket)
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createPemesanan(pemesananData, detailData) {
  // Start transaction (Supabase tidak support transaction langsung, jadi manual)
  const { data: pemesanan, error: pemesananError } = await supabase
    .from('pemesanan')
    .insert([pemesananData])
    .select();
  
  if (pemesananError) throw pemesananError;
  
  // Insert detail pemesanan
  const detailsWithOrderId = detailData.map(detail => ({
    ...detail,
    id_pemesanan: pemesanan[0].id
  }));
  
  const { data: details, error: detailError } = await supabase
    .from('detail_pemesanan')
    .insert(detailsWithOrderId)
    .select();
  
  if (detailError) throw detailError;
  
  return { pemesanan, details };
}

// ==================== PENGIRIMAN ====================
export async function getPengirimanWithPemesanan() {
  const { data, error } = await supabase
    .from('pengiriman')
    .select(`
      *,
      pemesanan:pemesanan(
        no_resi,
        pelanggan:pelanggan(nama_pelanggan, alamat1, telepon)
      )
    `);
  
  if (error) throw error;
  return data;
}

export async function updateStatusPengiriman(id, statusData) {
  const { data, error } = await supabase
    .from('pengiriman')
    .update(statusData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
}

// ==================== USERS ====================
export async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) throw error;
  return data;
}