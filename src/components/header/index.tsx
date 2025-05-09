import { Session } from "@supabase/supabase-js";
import { HeaderSection, HeaderWrapper, UserSection } from "./style";
import Button from "../atoms/button";

type HeaderProps = {
  session?: Session;
  setShowCreateRoomModal?: Function;
};

const Header = (props: HeaderProps) => {
  const { session, setShowCreateRoomModal } = props;

  return (
    <HeaderSection>
      <HeaderWrapper>
        {session ? (
          <>
            <UserSection
              onClick={() => {
                window.location.href = "/auth/user-config";
              }}
            >
              <img
                src={`/avatars/${session?.user?.user_metadata?.userAvatar}.webp`}
                alt="avatar"
                width={46}
                height={46}
              />
              <h2>{session?.user?.user_metadata?.userName}</h2>
            </UserSection>
            <Button
              onClick={() =>
                setShowCreateRoomModal && setShowCreateRoomModal(true)
              }
            >
              <span>📄 Nueva sala</span>
            </Button>
          </>
        ) : (
          <>
            <img src="/favicon.webp" alt="logo" width={46} height={46} />
            <h3>Bienvenido a Easy Planning Poker</h3>
          </>
        )}
      </HeaderWrapper>
    </HeaderSection>
  );
};

export default Header;
