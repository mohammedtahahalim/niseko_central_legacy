import { useParams } from "react-router-dom";
export default function BookingCategory() {
  const { category } = useParams();

  return <div>{category}</div>;
}
