import SidebarHeader from "./components/sidebar-header";
import UserList from "./components/user-list";
import { RevealButton, SidebarWrapper } from "./style";
import { useRoomContext } from "../../context/room-context";

const Sidebar = () => {
  const { showVotes, handleRevealVotes, handleResetVotes, isOwner } =
    useRoomContext();

  return (
    <SidebarWrapper>
      <SidebarHeader />
      {isOwner && (
        <div
          style={{
            padding: "20px 20px 0",
          }}
        >
          <RevealButton onClick={handleRevealVotes} disabled={showVotes}>
            Girar Cartas
          </RevealButton>
          <RevealButton
            style={{
              marginTop: 10,
              backgroundColor: "#0c5ed97f",
              color: "#ffffff",
            }}
            onClick={handleResetVotes}
          >
            Resetear Votos
          </RevealButton>
        </div>
      )}
      <UserList />
    </SidebarWrapper>
  );
};

export default Sidebar;
