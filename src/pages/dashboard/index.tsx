import { Session } from "@supabase/supabase-js";

interface SessionProps {
  session: Session;
}

const Dashboard = ({ session }: SessionProps) => {
  console.log(session);

  return <div>Dashboard</div>;
};

export default Dashboard;
