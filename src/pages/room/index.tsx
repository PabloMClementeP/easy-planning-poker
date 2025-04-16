import { Session } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/initSupabase";
import { getUserById } from "../../services/user-service";
import { getPlanningRoomById } from "../../services/planning-room";
import {
  Card,
  CardsList,
  CardsSection,
  CardValue,
  Container,
  Main,
  UserDot,
  UserItem,
  UsersSection,
  RevealButton,
} from "./style";

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

  const channelRef = useRef<any>(null);

  useEffect(() => {
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
              const vote = presenceArray[0]?.vote || null;
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
    await channelRef.current?.track({ vote });
  };

  const handleRevealVotes = () => {
    setShowVotes(true);
  };

  return (
    <Main>
      <Container>
        <CardsSection>
          <CardsList>
            {[1, 2, 3, 4, 5].map((num) => (
              <Card key={num} onClick={() => handleVote(num)}>
                <CardValue>{num}</CardValue>
              </Card>
            ))}
          </CardsList>
        </CardsSection>

        <UsersSection>
          <h3>Usuarios conectados: {participantsCount}</h3>

          {/* Mostrar botón solo al owner */}
          {room?.owner === session?.user?.id && (
            <RevealButton onClick={handleRevealVotes} disabled={showVotes}>
              Girar Cartas
            </RevealButton>
          )}

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
        </UsersSection>
      </Container>
    </Main>
  );
};

export default Room;
