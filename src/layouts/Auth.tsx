import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div>
      with auth
      <Outlet />
    </div>
  );
}
