import { Session } from "@supabase/supabase-js";
import {
  Main,
  Container,
  CardsSection,
  CardsGrid,
  StoryInput,
  ModalOverlay,
  ModalContent,
  ModalActions,
  TicketDraft,
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
import Button from "../../components/atoms/button";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              {ticketDraft && (
                <TicketDraft>{ticketDraft || "Sin descripción"}</TicketDraft>
              )}
              {!showVotes && (
                <Button onClick={() => setIsModalOpen(true)}>
                  <span>
                    {ticketDraft ? "Editar historia" : "Añadir historia"}
                  </span>
                </Button>
              )}

              {isModalOpen && (
                <ModalOverlay>
                  <ModalContent>
                    <h3>
                      {ticketDraft
                        ? "Editar historia del ticket"
                        : "Añadir nueva historia"}
                    </h3>
                    <StoryInput
                      placeholder="Escribe la descripción del ticket..."
                      value={ticketDraft}
                      onChange={(e) => setTicketDraft(e.target.value)}
                    />
                    <ModalActions>
                      <Button
                        onClick={async () => {
                          await updateTicketDescription(room?.id, ticketDraft);
                          handleTicketDescriptionChange(ticketDraft);
                          setIsModalOpen(false);
                        }}
                      >
                        <span>Guardar</span>
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>
                        <span>Cancelar</span>
                      </Button>
                    </ModalActions>
                  </ModalContent>
                </ModalOverlay>
              )}
            </>
          ) : (
            <TicketDraft>{ticketDraft || "Sin descripción"}</TicketDraft>
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
