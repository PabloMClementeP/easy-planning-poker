import { RoomType } from "../../pages/dashboard";
import { CardLink, CardSpan, CardWrapper } from "./style";

export const RoomCard = ({ id, name, created_at, isPublic }: RoomType) => {
  const createdAt = new Date(created_at);

  return (
    <CardLink href={`/rooms/${id}`}>
      <CardWrapper>
        <h2>{name}</h2>
        <p>
          Creado el {createdAt.getDate()} /{createdAt.getMonth()} /
          {createdAt.getFullYear()}
        </p>
        <CardSpan color={isPublic === "true" ? "#04922f" : "#dc3545"}>
          {isPublic === "true" ? "Publica" : "Privada"}
        </CardSpan>
      </CardWrapper>
    </CardLink>
  );
};
