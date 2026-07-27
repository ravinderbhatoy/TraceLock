import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";

export function NavbarComponent() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <Navbar
      className="bg-transparent! border-b border-white/10 shadow-none! sticky top-0 z-50 "
    >
      <NavbarBrand as={Link} to="/">
        <img src="/favicon.svg" className="mr-3 h-8" alt="TraceLock Logo" />
        <span className="text-2xl font-bold tracking-wide text-white">
          Trace<span className="text-blue-400">Lock</span>
        </span>
      </NavbarBrand>

      <NavbarToggle />

      <NavbarCollapse>
        {user ? (
          <div className="flex items-center gap-2">
            <Avatar img={user?.image} alt="avatar" rounded size="xs" />
            <Dropdown label={user.username} inline>
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownItem>My Complaints</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          </div>
        ) : (
          <>
            <NavbarLink as={Link} to="/signin">
              Sign In
            </NavbarLink>
            <NavbarLink as={Link} to="/signup">
              Sign Up
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
