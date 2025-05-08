import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/initSupabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/");
      } else {
        // Por si aún no está listo el token, puedes volver a intentar o redirigir con delay
        console.error("Sesión no encontrada tras redirección");
      }
    };

    checkSession();
  }, []);

  return <p>Procesando autenticación...</p>;
};

export default AuthCallback;
