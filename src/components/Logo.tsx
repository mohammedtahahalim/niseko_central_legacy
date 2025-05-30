import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../utils/context";
export default function Logo() {
  const { currentTheme } = useContext(AppContext);
  return (
    <Link to={"/"}>
      <img
        src={currentTheme === "light" ? "/logo_light.png" : "/logo_dark.png"}
        alt=""
      />
    </Link>
  );
}
