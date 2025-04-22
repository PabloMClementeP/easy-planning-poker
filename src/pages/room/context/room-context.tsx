import { createContext, useContext } from "react";
import useRoom from "../../../hooks/use-room";

const RoomContext = createContext<ReturnType<typeof useRoom> | null>(null);

export const RoomProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const room = useRoom(session);
  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext debe usarse dentro de RoomProvider");
  }
  return context;
};
