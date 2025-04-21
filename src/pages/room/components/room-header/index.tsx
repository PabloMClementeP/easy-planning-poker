import { useState } from "react";
import { HeaderWrapper } from "./style";
import { MdOutlineContentCopy } from "react-icons/md";

interface RoomProps {
  room: any;
}
const RoomHeader = ({ room }: RoomProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (room?.id) {
      navigator.clipboard.writeText(room.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <HeaderWrapper>
      <div>
        <a href="/">Salir al dashboard</a>
        <h1>{room?.name}</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {copied ? (
          <span style={{ fontSize: 12 }}>Copiado ✅</span>
        ) : (
          <span style={{ fontSize: 14 }}>Copiar ID</span>
        )}
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
          onClick={() => {
            handleCopy();
          }}
        >
          Room Id:{" "}
          <span style={{ fontWeight: 600, color: "rgb(219, 95, 12)" }}>
            {room?.id}
          </span>{" "}
          <MdOutlineContentCopy />
        </h3>
      </div>
    </HeaderWrapper>
  );
};

export default RoomHeader;
