import { Session } from "@supabase/supabase-js";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import NewRoomModal from "../../components/new-room-modal";
import {
  getAllPublicRooms,
  getPlanningRoom,
} from "../../services/planning-room";
import { RoomCard } from "../../components/room-card";
import { DashboardSection } from "./style";

export type RoomType = {
  id: string;
  name: string;
  created_at: string;
  isPublic: string;
};

interface SessionProps {
  session: Session;
}

const Dashboard = ({ session }: SessionProps) => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCreateRoomModal, setShowCreateRoomModal] =
    useState<boolean>(false);

  const hsaNoCreatedARoom = !loading && rooms?.length === 0;
  const hasAtLeastOneRoom = rooms && rooms?.length > 0;
  const shouldShowRoom = !loading && hasAtLeastOneRoom;

  const loadUserRooms = async () => {
    const userRooms = await getPlanningRoom(session?.user?.id);
    const publicRooms = await getAllPublicRooms();

    const combined = [...userRooms, ...publicRooms];
    const uniqueRoomsMap = new Map();

    combined.forEach((room) => {
      uniqueRoomsMap.set(room.id, room);
    });

    const uniqueRooms = Array.from(uniqueRoomsMap.values());

    setRooms(uniqueRooms);
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user?.id) {
      loadUserRooms();
    }
  }, [session?.user?.id]);

  return (
    <>
      <Header
        session={session}
        setShowCreateRoomModal={setShowCreateRoomModal}
      />

      {hsaNoCreatedARoom && <p>Tus salas se mostrarán aquí luego de creadas</p>}

      <DashboardSection>
        {shouldShowRoom &&
          rooms?.map(({ id, name, created_at, isPublic }, key) => (
            <RoomCard
              key={id + key}
              id={id}
              name={name}
              created_at={created_at}
              isPublic={isPublic}
            />
          ))}
      </DashboardSection>

      <NewRoomModal
        show={showCreateRoomModal}
        setShow={setShowCreateRoomModal}
        session={session}
        loadUserRooms={loadUserRooms}
      />
    </>
  );
};

export default Dashboard;
