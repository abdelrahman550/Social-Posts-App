import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import { Settings, User } from "lucide-react";
import logoImg from "/route.png";
import NavBarContentLinks from "./NavBarContentLinks";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContextProvider";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../Services/getUserData";
import defaultImg from "/default-profile.png";

export default function NavBar() {
  const router = useNavigate();

  // Token Authentication Hook
  const { setToken, token } = useContext(authContext);

  // Logout Function
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    router("/login");
  }

  const { data: userDataRes, isLoading } = useQuery({
    queryFn: () => getUserData(token),
    queryKey: ["userData", token],
    enabled: !!token,
  });

  const userData = userDataRes?.data?.data?.user;

  return (
    <>
      <Navbar
        maxWidth="xl"
        classNames={{
          base: "h-15",
          wrapper: "py-1.5 px-3",
        }}
      >
        <NavbarBrand className="gap-3">
          <span className="h-9 w-9 overflow-hidden rounded-xl">
            <img className="object-cover" src={logoImg} alt="siteLogo" />
          </span>
          <span className="hidden text-xl font-extrabold text-slate-900 sm:block">
            Route Posts
          </span>
        </NavbarBrand>

        <NavBarContentLinks />

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="cursor-pointer transition-transform"
                color="primary"
                isBordered 
                name="Jason Hughes"
                size="md"
                src={isLoading ? defaultImg : userData?.photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection className="border-b border-slate-200 pb-2">
                <DropdownItem
                  key="profile"
                  as={Link}
                  to={"/profile"}
                  startContent={<User size={16} />}
                  classNames={{ base: "navbar-toggle-item" }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings size={16} />}
                  classNames={{ base: "navbar-toggle-item" }}
                >
                  Settings
                </DropdownItem>
              </DropdownSection>
              <DropdownItem
                onPress={handleLogout}
                key="logout"
                color=""
                classNames={{
                  base: "text-sm font-semibold text-rose-600 hover:bg-rose-50",
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}
