import Container from "../Container";
import Logo from "../Logo";
import Heading from "./Heading";
import UserMenu from "./UserMenu";

interface NavbarProps {
  button?: boolean;
}

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Heading authName="Admin" />
        <UserMenu />
      </div>
    </div>
  );
}


export default Navbar;