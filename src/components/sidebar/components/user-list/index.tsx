import { UserDot, UserItem, UserName, USersList } from "./style";
import { useRoomContext } from "../../../../pages/room/context/room-context";

const UserList = () => {
  const { connectedUsers, showVotes } = useRoomContext();

  return (
    <USersList>
      <h3
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Usuarios</span>
        {connectedUsers.length}
      </h3>
      {connectedUsers.map((user) => (
        <UserItem key={user?.id}>
          <UserDot color={user?.user_metadata?.userColor} />
          <UserName>{user?.user_metadata?.userName}</UserName>
          <UserName>
            {showVotes
              ? user.vote !== null
                ? `🎯 ${user.vote}`
                : "❌"
              : user.vote !== null
              ? "✅"
              : "🕔"}
          </UserName>
        </UserItem>
      ))}
    </USersList>
  );
};

export default UserList;
