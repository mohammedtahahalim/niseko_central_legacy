import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function Home() {
  const { appContent } = useContext(AppContext);
  return <div>{appContent.Header}</div>;
}
