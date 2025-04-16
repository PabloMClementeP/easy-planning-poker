import { Session } from "@supabase/supabase-js";
import { Button, HeaderSection, HeaderWrapper } from "./style";

type HeaderProps = {
  session: Session;
  setShowCreateRoomModal: Function;
};

const Header = (props: HeaderProps) => {
  const { session, setShowCreateRoomModal } = props;

  return (
    <HeaderSection>
      <HeaderWrapper>
        <h3>Hola {session?.user?.user_metadata?.userName} 👋🏽</h3>
        <Button onClick={() => setShowCreateRoomModal(true)}>
          <span>📄 Nueva sala</span>
        </Button>
      </HeaderWrapper>
    </HeaderSection>
  );
};

export default Header;
