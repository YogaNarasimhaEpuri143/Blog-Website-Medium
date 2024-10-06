import { Appbar } from "../components/Appbar";
import { Outlet } from "react-router-dom";

export default function NavLayout() {
  return (
    <div>
      <Appbar />
      <Outlet />
    </div>
  );
}
