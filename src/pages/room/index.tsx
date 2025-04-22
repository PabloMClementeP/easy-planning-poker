import { Session } from "@supabase/supabase-js";
import {
  Main,
  Container,
  CardsSection,
  CardsGrid,
  RevealButton,
  StoryInput,
} from "./style";

import { useEffect, useState } from "react";
import {
  getTicketDescription,
  updateTicketDescription,
} from "../../services/planning-room";
import Card from "../../components/card";
import RoomHeader from "./components/room-header";
import Sidebar from "./components/sidebar";
import { RoomProvider, useRoomContext } from "./context/room-context";

const cards = ["1", "2", "3", "5", "8", "13", "?"];

const RoomContent = () => {
  const {
    room,
    showVotes,
    selectedVote,
    ticketDescription,
    setTicketDescription,
    handleVote,
    handleTicketDescriptionChange,
    isOwner,
  } = useRoomContext();

  const [ticketDraft, setTicketDraft] = useState<string>(ticketDescription);

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
      <RoomHeader room={room} />

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
              <Card
                key={index}
                value={value}
                selected={selectedVote === value}
                onClick={() => handleVote(value)}
                disabled={showVotes}
              />
            ))}
          </CardsGrid>
        </CardsSection>

        <Sidebar />
      </Container>
    </Main>
  );
};

const Room = ({ session }: { session: Session }) => {
  return (
    <RoomProvider session={session}>
      <RoomContent />
    </RoomProvider>
  );
};

export default Room;
