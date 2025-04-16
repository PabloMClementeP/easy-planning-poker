// src/presentation/login.tsx
import React, { useState } from "react";
import { supabase } from "../../lib/initSupabase";
import { Button, Form, Input, Label } from "./style";

const Login = () => {
  const [emailAdress, setEmailAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTokenSent, setIsTokenSent] = useState<boolean>(false);

  const authenticateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAdress) {
      alert("Dirección de correo obligatoria");
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email: emailAdress,
      options: {
        emailRedirectTo: import.meta.env.VITE_PUBLIC_REDIRECT_URL,
      },
    });
    if (error) {
      console.log(error);
      throw new Error("Algo salió mal al enviar el token");
    }

    if (data) {
      setIsTokenSent(true);
      setTimeout(() => {
        setIsTokenSent(false);
        setIsLoading(false);
      }, 5000);
    }
  };

  return (
    <Form onSubmit={authenticateUser}>
      <Label>Login con magic link 🧙🏽‍♂️</Label>
      <Input
        type="text"
        placeholder="Ingresa tu correo"
        onChange={(e) => setEmailAddress(e.target.value)}
        value={emailAdress}
      />
      <Button type="submit" disabled={isTokenSent || isLoading}>
        {isTokenSent
          ? "Token enviado"
          : isLoading
          ? "Enviando token..."
          : "Enviar token"}
      </Button>
    </Form>
  );
};

export default Login;
