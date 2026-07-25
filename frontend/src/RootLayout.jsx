import { Outlet } from "react-router-dom";
import { NavbarComponent } from "./components/Navbar";
import FooterComp from "./components/FooterComp";

export const RootLayout = () => {
  return (
    <div className="h-screen flex flex-col  bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white">
      {/* Navbar */}
      <NavbarComponent />

      {/* Active Page Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <FooterComp />
    </div>
  );
};

