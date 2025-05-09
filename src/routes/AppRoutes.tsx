// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import { Session } from "@supabase/supabase-js";
import Room from "../pages/room";
import AuthCallback from "../pages/auth-callback";
import NewUserSetup from "../components/new-user-setup";
import { supabase } from "../lib/initSupabase";
import { getUserSession } from "../services/user-service";

type Props = {
  session: Session | undefined;
};

const handleUserSetup = async (userName: string, userAvatar: string) => {
  await supabase.auth.updateUser({
    data: {
      userName,
      userAvatar,
    },
  });

  await getUserSession();
  window.location.href = "/";
};

const AppRoutes = ({ session }: Props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Dashboard session={session} /> : <Login />}
      />
      <Route
        path="/rooms/:id"
        element={session ? <Room session={session} /> : <Navigate to="/" />}
      />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/auth/user-config"
        element={<NewUserSetup onSubmit={handleUserSetup} />}
      />
    </Routes>
  );
};

export default AppRoutes;
