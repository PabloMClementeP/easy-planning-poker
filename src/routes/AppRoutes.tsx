// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import { Session } from "@supabase/supabase-js";
import Room from "../pages/room";

type Props = {
  session: Session | undefined;
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
    </Routes>
  );
};

export default AppRoutes;
