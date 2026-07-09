import { Outlet } from "react-router-dom";
import { NavbarComponent } from "./components/Navbar";

export const RootLayout = () => {
  return (
    <div>
      {/* Your Navbar */}
      <NavbarComponent />
      {/* This is where the active route page will render */}
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
