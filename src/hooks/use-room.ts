import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../services/user-service";
import { supabase } from "../lib/initSupabase";
import { getPlanningRoomById } from "../services/planning-room";

interface User {
  id?: string | undefined;
  user_metadata?: {
    userName?: string;
    userAvatar?: string;
  };
  vote?: number | null;
}

interface Room {
  id: string;
  name: string;
  owner: string;
  isPublic: boolean;
  [key: string]: any;
}

const useRoom = (session: any) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [showVotes, setShowVotes] = useState(false);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [ticketDescription, setTicketDescription] = useState<string>("");

  const channelRef = useRef<any>(null);

  const isOwner = room?.owner === session?.user?.id;

  const fetchConnectedUsers = async (state: any) => {
    const users = await Promise.all(
      Object.entries(state).map(async ([userID, presenceArray]: any) => {
        const { user } = await getUserById(userID);
        const vote = presenceArray[presenceArray.length - 1]?.vote ?? null;
        return { ...user, vote };
      })
    );
    setConnectedUsers(users);
    setParticipantsCount(users.length);
  };

  useEffect(() => {
    if (!id || !session?.user?.id) return;

    const channel = supabase.channel(`room-${id}`, {
      config: {
        presence: {
          key: session.user.id,
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        fetchConnectedUsers(state);
      })
      .on("broadcast", { event: "reveal_votes" }, () => {
        setShowVotes(true);
      })
      .on("broadcast", { event: "reset_votes" }, async () => {
        setShowVotes(false);
        setSelectedVote(null);
        await channel.track({ vote: null });
        fetchConnectedUsers(channel.presenceState());
      })
      .on(
        "broadcast",
        { event: "update_ticket_description" },
        (payload: any) => {
          setTicketDescription(payload.payload.description);
        }
      )
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
  }, [id, session?.user?.id]);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id || !session?.user?.id) return;

      const result = await getPlanningRoomById(id);
      if (!result || !Array.isArray(result) || result.length === 0) {
        return navigate("/");
      }

      const [roomData] = result;
      const canAccess = roomData.isPublic || roomData.owner === session.user.id;

      if (!canAccess) return navigate("/");

      setRoom(roomData);
    };

    fetchRoom();
  }, [id, session?.user?.id, navigate]);

  const handleVote = async (vote: string) => {
    if (showVotes || !channelRef.current) return;

    setSelectedVote(vote);
    await channelRef.current.track({ vote });
    fetchConnectedUsers(channelRef.current.presenceState());
  };

  const handleRevealVotes = () => {
    if (!channelRef.current) return;
    setShowVotes(true);
    channelRef.current.send({
      type: "broadcast",
      event: "reveal_votes",
      payload: {},
    });
  };

  const handleResetVotes = async () => {
    if (!channelRef.current) return;

    setShowVotes(false);
    setSelectedVote(null);
    setTicketDescription("");

    await channelRef.current.track({ vote: null });

    channelRef.current.send({
      type: "broadcast",
      event: "reset_votes",
      payload: {},
    });
  };

  const handleTicketDescriptionChange = (description: string) => {
    setTicketDescription(description);
    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "update_ticket_description",
        payload: { description },
      });
    }
  };

  return {
    room,
    connectedUsers,
    participantsCount,
    showVotes,
    selectedVote,
    ticketDescription,
    setTicketDescription,
    handleVote,
    handleRevealVotes,
    handleResetVotes,
    handleTicketDescriptionChange,
    isOwner,
  };
};

export default useRoom;
