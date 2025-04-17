import { supabase } from "../lib/initSupabase";

const PLANNING_ROOM = "planning-poker";

export const createPlanningRoom = async (
  name: string,
  userId: string,
  isPublic: boolean
) => {
  const { data } = await supabase
    .from(PLANNING_ROOM)
    .insert({
      name,
      owner: userId,
      isPublic,
      isPasswordProtected: false,
      password: null,
    })
    .select();

  return data;
};

export const getPlanningRoom = async (userId: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from(PLANNING_ROOM)
    .select()
    .eq("owner", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error getting user rooms:", error.message);
    return [];
  }

  return data ?? [];
};

export const getPlanningRoomById = async (
  roomId: string
): Promise<any[] | null> => {
  const { data } = await supabase.from(PLANNING_ROOM).select().eq("id", roomId);

  return data;
};

export const updatePlanningRoom = async (roomId: string, vote: any) => {
  await supabase
    .from(PLANNING_ROOM)
    .update({
      vote,
    })
    .eq("id", roomId)
    .select();
};

export const deleteRoomsIdOwner = async (roomId: string, userId: string) => {
  const { data: room, error } = await supabase
    .from(PLANNING_ROOM)
    .select("owner")
    .eq("id", roomId)
    .single();

  if (error) {
    throw error;
  }

  if (room.owner !== userId) {
    throw new Error("No tienes permiso para eliminar esta sala");
  }

  const { error: deleteError } = await supabase
    .from(PLANNING_ROOM)
    .delete()
    .eq("id", roomId);

  if (deleteError) throw deleteError;

  return true;
};

export const getAllPublicRooms = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from(PLANNING_ROOM)
    .select("*")
    .eq("isPublic", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error getting public rooms:", error.message);
    return [];
  }

  return data ?? [];
};
