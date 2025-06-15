import { useParams } from "react-router-dom";

export default function Article() {
  const { title } = useParams();
  return <div>{title}</div>;
}
