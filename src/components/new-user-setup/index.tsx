import React, { useState } from "react";
import {
  AvatarOption,
  Button,
  ColorPicker,
  Container,
  Form,
  Input,
  Label,
  Subtitle,
  Title,
} from "./styled";
import Header from "../header";

interface NewUserSetupProps {
  onSubmit: (userName: string, userAvatar: string) => void;
}

const avatars = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
];

const NewUserSetup: React.FC<NewUserSetupProps> = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert("Por favor, ingresa un nombre.");
      return;
    }
    onSubmit(userName, selectedAvatar);
  };

  return (
    <>
      <Header />
      <Container>
        <Title>Easy Planning Poker 🃏</Title>
        <Subtitle>Configura tu perfil para comenzar</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Label>Tu nombre</Label>
          <Input
            type="text"
            placeholder="Ingresa tu nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Label>Selecciona un color</Label>
          <ColorPicker>
            {avatars.map((avatar, index) => (
              <AvatarOption $isSelected={selectedAvatar === avatar}>
                <img
                  src={`/avatars/${avatar}.webp`}
                  alt="avatar"
                  width={60}
                  height={60}
                  onClick={() => setSelectedAvatar(avatar)}
                  key={`${avatar}-${index}`}
                />
              </AvatarOption>
            ))}
          </ColorPicker>

          <Button type="submit">Guardar</Button>
        </Form>
      </Container>
    </>
  );
};

export default NewUserSetup;
