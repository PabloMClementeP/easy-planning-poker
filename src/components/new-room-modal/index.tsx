import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Backdrop,
  Button,
  CheckboxContainer,
  Input,
  ModalContainer,
  Title,
} from "./style";
import { createPlanningRoom } from "../../services/planning-room";

type NewRoomModalProps = {
  show: boolean;
  setShow: Function;
  loadUserRooms: Function;
  session: any;
};

const NewRoomModal = ({
  show,
  setShow,
  loadUserRooms,
  session,
}: NewRoomModalProps) => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-backdrop" && !isCreatingRoom) {
      setShow(false);
    }
  };

  return (
    <>
      {show && (
        <Backdrop id="modal-backdrop" onClick={handleBackdropClick}>
          <ModalContainer>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsCreatingRoom(true);
                const newRoom = await createPlanningRoom(
                  roomName,
                  session?.user?.id,
                  isPublic
                );
                loadUserRooms();
                navigate(`/rooms/${newRoom![0].id}`);
              }}
            >
              <Title>🗃️ Crear nueva sala</Title>
              <Input
                type="text"
                placeholder="Nombre de sala"
                onChange={(e) => setRoomName(e.target.value)}
                value={roomName}
              />

              <CheckboxContainer>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  id="publicRoom"
                />
                <label htmlFor="publicRoom">Pública</label>
              </CheckboxContainer>

              <Button disabled={isCreatingRoom} type="submit">
                {isCreatingRoom ? "Creando sala..." : "Crear sala"}
              </Button>
            </form>
          </ModalContainer>
        </Backdrop>
      )}
    </>
  );
};

export default NewRoomModal;
