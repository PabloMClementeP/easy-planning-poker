import { Session } from "@supabase/supabase-js";
import { adminAuthClient, supabase } from "../lib/initSupabase";

export const getUserSession = async (): Promise<Session | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const getUserById = async (userId: string) => {
  const { data } = await adminAuthClient.getUserById(userId);

  return data;
};
