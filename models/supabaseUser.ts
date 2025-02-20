import supabase from "../libs/supabaseClient";

export interface SupabaseUser {
  id: string;
  name: string;
  email: string;
  clerkUserId: string;
  about?: string;
  emailReminders: boolean;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  imageUrl?: string;
  imageAlt?: string;
  isStripeConnected: boolean;
  stripeAccountId?: string;
  createdAt?: string;
}

export const createSupabaseUser = async (user: SupabaseUser) => {
  const { data, error } = await supabase.from("users").insert([user]);

  if (error) throw error;
  return data;
};

export const getSupabaseUser = async (clerkUserId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerkUserId", clerkUserId)
    .single();

  if (error) throw error;
  return data;
};

export const getSupabaseUserById = async (clerkUserId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerkUserId", clerkUserId)
    .single();

  if (error) throw error;
  return data;
};
