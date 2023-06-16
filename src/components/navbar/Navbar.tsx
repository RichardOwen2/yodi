import Container from "../Container";
import Logo from "../Logo";
import Heading from "./Heading";
import UserMenu from "./UserMenu";

interface NavbarProps {
 authName: string;
  button?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ authName }) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Heading authName={authName} />
        <UserMenu />
      </div>
    </div>
  );
}


export default Navbar;