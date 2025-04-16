import React, { useState } from "react";
import {
  Button,
  ColorCircle,
  ColorPicker,
  Container,
  Form,
  Input,
  Label,
  Subtitle,
  Title,
} from "./styled";

interface NewUserSetupProps {
  onSubmit: (userName: string, userColor: string) => void;
}

const colors = [
  "#3b82f6",
  "#14b8a6",
  "#f87171",
  "#eab308",
  "#a855f7",
  "#6366f1",
];

const NewUserSetup: React.FC<NewUserSetupProps> = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert("Por favor, ingresa un nombre.");
      return;
    }
    onSubmit(userName, selectedColor);
  };

  return (
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
          {colors.map((color) => (
            <ColorCircle
              key={color}
              color={color}
              selected={color === selectedColor}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </ColorPicker>

        <Button type="submit">Guardar</Button>
      </Form>
    </Container>
  );
};

export default NewUserSetup;
