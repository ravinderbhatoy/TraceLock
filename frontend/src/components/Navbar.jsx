import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Button,
} from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { useState } from "react";

export function NavbarComponent() {
  const { user, logout, navigate } = useAuth();
  const [search, setSearch] = useState("")

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("searching", search)
    navigate(`/complaints?search=${search}`)
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
        <form className="flex max-w-md gap-4 items-center" action="" onSubmit={handleSubmit}>
          <TextInput value={search} onChange={(e) => setSearch(e.target.value)} icon={HiSearch} placeholder="Search by device or brand" sizing="sm" />
          <Button type="submit" size="sm">Search</Button>
        </form>
      </NavbarCollapse>


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
