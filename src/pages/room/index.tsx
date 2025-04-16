import { Session } from "@supabase/supabase-js";

interface RoomProps {
  session: Session;
}

const Room = ({ session }: RoomProps) => {
  return <div>{session.user.id}</div>;
};

export default Room;
