import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { supabase } from "./lib/initSupabase";
import { getUserSession } from "./services/user-service";
import { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session>();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  const generateUserColor = () => {
    const colors = [
      "#3b82f6",
      "#14b8a6",
      "#f87171",
      "#eab308",
      "#a855f7",
      "#6366f1",
    ];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  };

  const createUserNameFromEmail = (email: string) => {
    try {
      let username = email.split("@")[0];
      return username;
    } catch (error) {
      throw new Error("Error al crear el nombre de usuario" + error);
    }
  };

  useEffect(() => {
    getUserSession()
      .then(async (session) => {
        if (session) {
          const isNewUser =
            !session.user.user_metadata.userName ||
            !session.user.user_metadata.userColor;

          if (isNewUser) {
            const userName = createUserNameFromEmail(
              session.user.email as string
            );
            const userColor = generateUserColor();

            await supabase.auth.updateUser({
              data: {
                userName,
                userColor,
              },
            });

            const refreshedSession = await getUserSession();
            setSession(refreshedSession ?? undefined);
          } else {
            setSession(session);
          }
        }

        setIsAuthenticating(false);
      })
      .catch((error) => {
        console.error("Error al obtener la sesión del usuario:", error);
        setIsAuthenticating(false);
      });
  }, []);

  if (isAuthenticating) {
    return <div>Validando la sesión, espera...</div>;
  }
  return (
    <BrowserRouter>
      <AppRoutes session={session} />
    </BrowserRouter>
  );
}

export default App;
