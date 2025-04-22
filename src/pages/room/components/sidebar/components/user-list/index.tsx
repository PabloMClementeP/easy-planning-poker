import { UserAvatar, UserItem, UserName, USersList } from "./style";
import { useRoomContext } from "../../../../context/room-context";

const UserList = () => {
  const { connectedUsers, showVotes } = useRoomContext();

  return (
    <USersList>
      <h3
        style={{
          margin: "1rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ececec",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
        }}
      >
        <span>Usuarios</span>
        {connectedUsers.length}
      </h3>
      {connectedUsers.map((user) => (
        <UserItem key={user?.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <UserAvatar>
              <img
                src={`/avatars/${user?.user_metadata?.userAvatar}.webp`}
                alt="avatar"
              />
            </UserAvatar>
            <UserName>{user?.user_metadata?.userName}</UserName>
          </div>
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
