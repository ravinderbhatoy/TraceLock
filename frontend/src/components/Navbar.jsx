import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export function NavbarComponent() {
  const { token, setToken } = useAuth();

  const logout = () => {
    console.log("Logging out...");
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} to="/">
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-blue-500">
          Tracelo{" "}
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active>
          Home
        </NavbarLink>
        {token ? (
          <>
            <NavbarLink as={Link} to="/profile">
              Profile
            </NavbarLink>
            <NavbarLink as={Link} to="/" onClick={logout}>
              Logout
            </NavbarLink>
          </>
        ) : (
          <>
            <NavbarLink as={Link} to="/signin">
              SignIn
            </NavbarLink>
            <NavbarLink as={Link} to="/signup">
              SignUp
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
