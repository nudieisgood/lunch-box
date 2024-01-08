import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link to={"/"} className="logo">
      <img src={logo} alt="logo image" />
    </Link>
  );
};
export default Logo;
