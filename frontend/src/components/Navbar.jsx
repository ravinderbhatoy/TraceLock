import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function NavbarComponent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    await logout();
    navigate("/");
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
        {user ? (
          <>
            <NavbarLink as={Link} to="/profile">
              Profile
            </NavbarLink>
            <NavbarLink href="/" onClick={handleLogout}>
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
