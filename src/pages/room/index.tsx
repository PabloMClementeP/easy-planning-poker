import { Session } from "@supabase/supabase-js";
import {
  Main,
  Container,
  CardsSection,
  CardsGrid,
  Header,
  SideBar,
  RevealButton,
} from "./style";
import VoteCard from "./components/vote-card";
import UserList from "./components/user-list";
import useRoom from "./hooks/use-room";

const cards = [1, 2, 3, 5, 8, 13];

interface RoomProps {
  session: Session;
}

const Room = ({ session }: RoomProps) => {
  const {
    room,
    showVotes,
    selectedVote,
    connectedUsers,
    participantsCount,
    handleVote,
    handleRevealVotes,
    handleResetVotes,
    isOwner,
  } = useRoom(session);

  return (
    <Main>
      <Header>
        <div>
          <a href="/">Salir al dashboard</a>
          <h1>{room?.name}</h1>
        </div>
        <h3>
          Room Id:{" "}
          <span style={{ fontWeight: 600, color: "rgb(219, 95, 12)" }}>
            {room?.id}
          </span>{" "}
          📎
        </h3>
      </Header>

      <Container>
        <CardsSection>
          <CardsGrid>
            {cards.map((value, index) => (
              <VoteCard
                key={index}
                value={value}
                selected={selectedVote === value}
                onClick={() => handleVote(value)}
                disabled={showVotes}
              />
            ))}
          </CardsGrid>
        </CardsSection>

        <SideBar>
          {isOwner ? (
            <>
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
            </>
          ) : (
            <div
              style={{
                height: 40,
                textAlign: "center",
                lineHeight: "40px",
                backgroundColor: "#f5f5f5",
              }}
            >
              Esperando votos del equipo
            </div>
          )}

          <h3
            style={{
              margin: "20px 0",
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Usuarios: <span>{participantsCount}</span>
          </h3>

          <UserList users={connectedUsers} showVotes={showVotes} />
        </SideBar>
      </Container>
    </Main>
  );
};

export default Room;
