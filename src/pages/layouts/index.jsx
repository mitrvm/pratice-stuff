import { Outlet } from "react-router-dom";

export function NakedLayout() {
  return (
    <main
      style={{
        flex: 1,
        minHeight: 0,
        overflowX: "hidden",
        overflowY: "auto",
        width: "100%",
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Outlet />
    </main>
  );
}
