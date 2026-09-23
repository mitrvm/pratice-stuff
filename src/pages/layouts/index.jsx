import { Outlet } from "react-router-dom";
import "./styles.css";

export function NakedLayout() {
  return (
    <main className="app-layout">
      <Outlet />
    </main>
  );
}
