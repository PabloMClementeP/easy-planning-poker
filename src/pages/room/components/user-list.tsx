import { UserDot, UserItem, UserName, USersList } from "../style";

const UserList = ({
  users,
  showVotes,
}: {
  users: any[];
  showVotes: boolean;
}) => (
  <USersList>
    {users.map((user) => (
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

export default UserList;
