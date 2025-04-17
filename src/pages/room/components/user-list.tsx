import { UserDot, UserItem } from "../style";

const UserList = ({
  users,
  showVotes,
}: {
  users: any[];
  showVotes: boolean;
}) => (
  <ul>
    {users.map((user) => (
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
);

export default UserList;
