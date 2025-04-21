import { Session } from "@supabase/supabase-js";
import useRoom from "../../hooks/use-room";
import SidebarHeader from "./components/sidebar-header";
import UserList from "./components/user-list";
import { RevealButton, SidebarWrapper } from "./style";

interface SidebarProps {
  session: Session | null;
  users: any[];
}

const Sidebar = ({ session, users }: SidebarProps) => {
  const { showVotes, handleRevealVotes, handleResetVotes, isOwner } =
    useRoom(session);

  return (
    <SidebarWrapper>
      <SidebarHeader />
      {isOwner && (
        <div
          style={{
            padding: 20,
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

      <UserList users={users} showVotes={showVotes} />
    </SidebarWrapper>
  );
};

export default Sidebar;
