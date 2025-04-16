import { Session } from "@supabase/supabase-js";

interface RoomProps {
  session: Session;
}

const Room = ({ session }: RoomProps) => {
  return <div>Room</div>;
};

export default Room;
