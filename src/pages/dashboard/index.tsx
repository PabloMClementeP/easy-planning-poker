import { Session } from "@supabase/supabase-js";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import NewRoomModal from "../../components/new-room-modal";
import { getPlanningRoom } from "../../services/planning-room";
import { RoomCard } from "../../components/room-card";
import { DashboardSection, JoinRoomInput, JoinRoomWrapper } from "./style";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button";
import NoRoomMsg from "../../components/no-room-msg";

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

  const [roomIdInput, setRoomIdInput] = useState("");
  const navigate = useNavigate();

  const loadUserRooms = async () => {
    const userRooms = await getPlanningRoom(session?.user?.id);

    setRooms(userRooms);
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user?.id) {
      loadUserRooms();
    }
  }, [session?.user?.id]);

  const handleEnterRoom = () => {
    if (roomIdInput.trim() !== "") {
      navigate(`/rooms/${roomIdInput.trim()}`);
    }
  };

  return (
    <>
      <Header
        session={session}
        setShowCreateRoomModal={setShowCreateRoomModal}
      />

      <JoinRoomWrapper>
        <JoinRoomInput
          type="text"
          placeholder="Ingresá el ID de la sala"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
        />
        <Button onClick={handleEnterRoom}>
          <span>Entrar</span>
        </Button>
      </JoinRoomWrapper>
      {hsaNoCreatedARoom && <NoRoomMsg />}
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
