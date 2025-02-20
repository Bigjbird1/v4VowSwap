import supabase from "../libs/supabaseClient";

export interface SupabaseMessage {
  id?: string;
  messageThreadId: string;
  message: string;
  createdAt?: string;
  status: "approved" | "pending_review" | "active";
  sellerName: string;
  buyerName: string;
}

/**
 * Creates a new message in Supabase
 */
export const createSupabaseMessage = async (message: SupabaseMessage) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([message])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves messages for a specific thread
 */
export const getMessagesByThreadId = async (messageThreadId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("messageThreadId", messageThreadId)
    .order("createdAt", { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Updates a message status
 */
export const updateMessageStatus = async (
  messageId: string,
  status: SupabaseMessage["status"]
) => {
  const { data, error } = await supabase
    .from("messages")
    .update({ status })
    .eq("id", messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAllSupabaseMessages = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("createdAt", { ascending: true });

  if (error) throw error;
  return data;
};

export const getSupabaseMessagesByThreadId = async (
  messageThreadId: string
) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("messageThreadId", messageThreadId)
    .order("createdAt", { ascending: true });

  if (error) throw error;
  return data;
};
