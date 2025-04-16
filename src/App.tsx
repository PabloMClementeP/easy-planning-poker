import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { supabase } from "./lib/initSupabase";
import { getUserSession } from "./services/user-service";
import { Session } from "@supabase/supabase-js";
import NewUserSetup from "./components/new-user-setup";

function App() {
  const [session, setSession] = useState<Session>();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    getUserSession()
      .then(async (session) => {
        if (session) {
          const isNew =
            !session.user.user_metadata.userName ||
            !session.user.user_metadata.userColor;

          if (isNew) {
            setSession(session);
            setIsNewUser(true);
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

  const handleUserSetup = async (userName: string, userColor: string) => {
    await supabase.auth.updateUser({
      data: {
        userName,
        userColor,
      },
    });

    const updatedSession = await getUserSession();
    setSession(updatedSession ?? undefined);
    setIsNewUser(false);
  };

  if (isAuthenticating) {
    return <div>Validando la sesión, espera...</div>;
  }

  if (isNewUser && session) {
    return <NewUserSetup onSubmit={handleUserSetup} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes session={session} />
    </BrowserRouter>
  );
}

export default App;
