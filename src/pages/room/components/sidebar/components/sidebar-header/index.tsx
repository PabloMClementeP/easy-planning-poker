import { useRoomContext } from "../../../../context/room-context";
import { HeaderWrapper } from "./style";

const SidebarHeader = () => {
  const { showVotes } = useRoomContext();

  return (
    <HeaderWrapper>
      {showVotes ? <p>Votación finalizada</p> : <p>Esperando votación</p>}
    </HeaderWrapper>
  );
};

export default SidebarHeader;
