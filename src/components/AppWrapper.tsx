import {
  AppShell,
  Navbar,
  MediaQuery,
  Burger,
  Header,
  Text,
  UnstyledButton,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { auth, ChrildrenProps } from "src/utils";
import { LOGOUT } from "src/store/actions";
import { signOut } from "firebase/auth";
import { headerHeight } from "src/constants/StyleConstants";
import { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { User } from "src/views/DashboardPage/components/User";
import { NavLink } from "react-router-dom";
import { navbarItems } from "src/constants/NavbarItems";
import { HeaderItems } from "src/components/HeaderItems";

export const AppWrapper = ({ children }: ChrildrenProps) => {
  const dispatcher = useDispatch();

  const [opened, setOpened] = useState(false);

  const logOut = async () => {
    signOut(auth)
      .then(async () => {
        await dispatcher({
          type: LOGOUT,
          payload: {
            isLoggedIn: false,
            user: "",
            token: "",
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const toggleNavbar = () => {
    setOpened(!opened);
  };
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300 }}
        >
          <Navbar.Section mt="xs" grow component={ScrollArea}>
            {navbarItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) => (isActive ? "active-navlink" : "")}
              >
                <UnstyledButton
                  sx={{
                    display: "block",
                    width: "100%",
                    padding: "16px 12px",
                    borderRadius: 6,
                    "&:hover": {
                      background: "rgb(248, 249, 250)",
                    },
                  }}
                >
                  <Group>
                    {item.icon}

                    <Text size="sm">{item.label}</Text>
                  </Group>
                </UnstyledButton>
              </NavLink>
            ))}

            <UnstyledButton
              onClick={logOut}
              sx={{
                display: "block",
                width: "100%",
                padding: "16px 12px",
                borderRadius: 6,
                "&:hover": {
                  background: "rgb(248, 249, 250)",
                },
              }}
            >
              <Group>
                <LogoutOutlinedIcon />

                <Text size="sm">Logout</Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>

          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={headerHeight} padding="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={toggleNavbar}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            {/*  <MediaQuery smallerThan="sm" styles={{ display: "none" }}> //TODO: add support for closed navbar with icon buttons
              <UnstyledButton
                sx={{ marginRight: 24, display: "flex" }}
                onClick={toggleNavbar}
              >
                <MenuIcon style={{ fontSize: 28 }} />
              </UnstyledButton>
            </MediaQuery> */}

            <HeaderItems />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
