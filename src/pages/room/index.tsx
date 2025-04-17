import { Session } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/initSupabase";
import { getUserById } from "../../services/user-service";
import { getPlanningRoomById } from "../../services/planning-room";
import {
  Card,
  CardsSection,
  CardValue,
  Container,
  Main,
  UserDot,
  UserItem,
  RevealButton,
  SideBar,
  CardsGrid,
  Header,
} from "./style";

const cards = [1, 2, 3, 5, 8, 13];

interface RoomProps {
  session: Session;
}

const Room = ({ session }: RoomProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [owner, setOwner] = useState<any | null>(null);
  const [room, setRoom] = useState<any>([]);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [participantsCount, setParticipantsCount] = useState<number>(0);
  const [showVotes, setShowVotes] = useState<boolean>(false);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  const channelRef = useRef<any>(null);

  useEffect(() => {
    console.log(owner, isLoading); // TEMP: eliminar cuando ya se usen

    if (!id || !session?.user?.id) return;

    if (!channelRef.current) {
      const channel = supabase.channel(`room-${id}`, {
        config: {
          presence: {
            key: session.user.id,
          },
        },
      });

      channel
        .on("presence", { event: "sync" }, async () => {
          const state = channel.presenceState();

          const users = await Promise.all(
            Object.entries(state).map(async ([userID, presenceArray]: any) => {
              const res = await getUserById(userID);
              const user = res.user;
              const latestPresence = presenceArray[presenceArray.length - 1];
              const vote = latestPresence?.vote || null;
              return { ...user, vote };
            })
          );

          setConnectedUsers(users);
          setParticipantsCount(users.length);
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await channel.track({ vote: null });
          }
        });

      channel.on("broadcast", { event: "reveal_votes" }, () => {
        setShowVotes(true);
      });
      channelRef.current = channel;

      return () => {
        channel.unsubscribe();
        channelRef.current = null;
      };
    }
  }, [id, session?.user?.id]);

  useEffect(() => {
    getPlanningRoomById(id as string).then((res) => {
      const roomData = res![0];
      const canEnterRoom =
        roomData.isPublic || roomData.owner === session?.user?.id;

      if (!canEnterRoom) {
        navigate("/");
      }

      setRoom(roomData);
      setIsLoading(false);

      getUserById(roomData.owner).then((res) => {
        setOwner(res.user);
      });
    });
  }, []);

  const handleVote = async (vote: number) => {
    setSelectedVote(vote);
    await channelRef.current?.track({ vote });

    // Esto ayuda a forzar el sync (no siempre necesario, pero útil si hay delays)
    const state = channelRef.current?.presenceState();
    if (state) {
      const users = await Promise.all(
        Object.entries(state).map(async ([userID, presenceArray]: any) => {
          const res = await getUserById(userID);
          const user = res.user;
          const vote = presenceArray[0]?.vote || null;
          return { ...user, vote };
        })
      );
      setConnectedUsers(users);
    }
    console.log("Presence state:", state);
  };

  const handleRevealVotes = () => {
    setShowVotes(true);
    channelRef.current?.send({
      type: "broadcast",
      event: "reveal_votes",
      payload: {},
    });
  };

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
            {room.id}
          </span>
          📎
        </h3>
      </Header>
      <Container>
        <CardsSection>
          <CardsGrid>
            {cards.map((value, index) => (
              <Card key={index} onClick={() => handleVote(value)}>
                <CardValue $selected={value == selectedVote}>{value}</CardValue>
              </Card>
            ))}
          </CardsGrid>
        </CardsSection>

        <SideBar>
          {/* Mostrar botón solo al owner */}
          {room?.owner === session?.user?.id ? (
            <RevealButton onClick={handleRevealVotes} disabled={showVotes}>
              Girar Cartas
            </RevealButton>
          ) : (
            <div
              style={{
                height: 40,
                textAlign: "center",
                lineHeight: "40px",
                borderRadius: 4,
                backgroundColor: "#f5f5f5",
              }}
            >
              Esperando votos del equipo
            </div>
          )}

          <h3
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 16,
              fontWeight: 600,
              margin: "20px 0",
            }}
          >
            Usuarios:
            <span>{participantsCount}</span>
          </h3>
          <ul>
            {connectedUsers.map((user) => (
              <UserItem key={user?.id}>
                <UserDot color={user?.user_metadata?.userColor} />
                {user?.user_metadata?.userName}
                <span style={{ marginLeft: 10 }}>
                  {showVotes
                    ? user.vote !== null
                      ? `🎯 ${user.vote}`
                      : "❌"
                    : user.vote !== null
                    ? "✅"
                    : "🕔"}
                </span>
              </UserItem>
            ))}
          </ul>
        </SideBar>
      </Container>
    </Main>
  );
};

export default Room;
