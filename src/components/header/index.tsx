import { Session } from "@supabase/supabase-js";
import { Button, HeaderSection, HeaderWrapper } from "./style";

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
            <h3>Hola {session?.user?.user_metadata?.userName} 👋🏽</h3>
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
            <img src="favicon.webp" alt="logo" width={46} height={46} />
            <h3>Bienvenido a Easy Planning Poker</h3>
          </>
        )}
      </HeaderWrapper>
    </HeaderSection>
  );
};

export default Header;
