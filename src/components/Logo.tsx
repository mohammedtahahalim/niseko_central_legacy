import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../utils/context";
export default function Logo() {
  const { currentTheme } = useContext(AppContext);
  return (
    <Link to={"/"}>
      <img
        src={
          currentTheme === "light"
            ? "/src/assets/logo_light.png"
            : "/src/assets/logo_dark.png"
        }
        alt=""
      />
    </Link>
  );
}
