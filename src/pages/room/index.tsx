import { Session } from "@supabase/supabase-js";
import { MdOutlineContentCopy } from "react-icons/md";
import {
  Main,
  Container,
  CardsSection,
  CardsGrid,
  Header,
  SideBar,
  RevealButton,
  StoryInput,
} from "./style";
import VoteCard from "./components/vote-card";
import UserList from "./components/user-list";
import useRoom from "./hooks/use-room";
import { useEffect, useState } from "react";
import {
  getTicketDescription,
  updateTicketDescription,
} from "../../services/planning-room";

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
    ticketDescription,
    setTicketDescription,
    handleVote,
    handleRevealVotes,
    handleResetVotes,
    handleTicketDescriptionChange,
    isOwner,
  } = useRoom(session);

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [ticketDraft, setTicketDraft] = useState<string>(ticketDescription);

  const handleCopy = () => {
    if (room?.id) {
      navigator.clipboard.writeText(room.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    setTicketDraft(ticketDescription);
  }, [ticketDescription]);

  useEffect(() => {
    const getTicketDescriptions = async () => {
      if (!room?.id) return;
      const description = await getTicketDescription(room.id);
      setTicketDraft(description);
      setTicketDescription(description);
    };

    getTicketDescriptions();
  }, [room?.id]);

  return (
    <Main>
      <Header>
        <div>
          <a href="/">Salir al dashboard</a>
          <h1>{room?.name}</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {copied ? (
            <span style={{ fontSize: 14 }}>Copiado ✅</span>
          ) : (
            <span style={{ fontSize: 14 }}>Copiar ID</span>
          )}
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Room Id:{" "}
            <span style={{ fontWeight: 600, color: "rgb(219, 95, 12)" }}>
              {room?.id}
            </span>{" "}
            <MdOutlineContentCopy
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                handleCopy();
              }}
            />
          </h3>
        </div>
      </Header>

      <Container>
        <CardsSection>
          {isOwner ? (
            <>
              <StoryInput
                placeholder="descripción del ticket..."
                value={ticketDescription}
                onChange={(e) => handleTicketDescriptionChange(e.target.value)}
              />
              <div style={{ display: "flex", gap: 10 }}>
                <RevealButton
                  onClick={async () => {
                    await updateTicketDescription(room?.id, ticketDraft);
                    handleTicketDescriptionChange(ticketDraft);
                    setIsEditing(false);
                  }}
                >
                  Guardar
                </RevealButton>
              </div>
            </>
          ) : (
            <h3
              style={{
                width: "80%",
                textAlign: "center",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {ticketDraft || "Sin descripción"}
            </h3>
          )}
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
