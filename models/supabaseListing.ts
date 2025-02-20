import supabase from "../libs/supabaseClient";

export interface SupabaseListing {
  id?: string;
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
  sellerId: string;
  primaryColor?: string;
  secondaryColor?: string;
  yearProduced?: number;
  condition: "new" | "used";
  hasLabel: boolean;
  hasOriginalBox: boolean;
  createdAt?: string;
}

/**
 * Creates a new listing in Supabase
 */
export const createSupabaseListing = async (listing: SupabaseListing) => {
  const { data, error } = await supabase
    .from("listings")
    .insert([
      {
        ...listing,
        photos: JSON.stringify(listing.photos),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves a listing by its ID
 */
export const getSupabaseListingById = async (listingId: string) => {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", listingId)
    .single();

  if (error) throw error;
  return {
    ...data,
    photos: JSON.parse(data.photos),
  };
};

/**
 * Fetches all listings
 */
export const getAllSupabaseListings = async () => {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data.map((listing) => ({
    ...listing,
    photos: JSON.parse(listing.photos),
  }));
};

/**
 * Updates a listing
 */
export const updateSupabaseListing = async (
  listingId: string,
  updates: Partial<SupabaseListing>
) => {
  const { data, error } = await supabase
    .from("listings")
    .update({
      ...updates,
      photos: updates.photos ? JSON.stringify(updates.photos) : undefined,
    })
    .eq("id", listingId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getSupabaseListingsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("sellerId", userId)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data.map((listing) => ({
    ...listing,
    photos: JSON.parse(listing.photos),
  }));
};
