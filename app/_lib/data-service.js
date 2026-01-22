import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export async function getVehicles(filter = "all") {
  let query = supabase
    .from("vehicles")
    .select("*")
    .eq("isSold", false)
    .order("make");

  if (filter === "low") query = query.lte("regularPrice", 80000);
  if (filter === "medium")
    query = query.gt("regularPrice", 80000).lte("regularPrice", 160000);
  if (filter === "high") query = query.gt("regularPrice", 160000);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data ?? [];
}

export async function getVehicle(id) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch vehicle", error);
    notFound();
  }
  if (!data) {
    notFound();
  }
  return data;
}

export async function createCustomer(newCustomer) {
  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer]);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getCustomer(email) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getSales(customerId) {
  const { data, error } = await supabase
    .from("sales")
    .select("*, vehicles(image, make, model, id)")
    .eq("customerId", customerId)
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getSale(saleId) {
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .eq("id", saleId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
