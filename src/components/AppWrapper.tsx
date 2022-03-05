import {
  AppShell,
  Navbar,
  Button,
  MediaQuery,
  Burger,
  Header,
  Text,
  UnstyledButton,
  Group,
  ScrollArea,
  Image,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { auth, ChrildrenProps } from "src/utils";
import { LOGOUT } from "src/store/actions";
import { signOut } from "firebase/auth";
import { headerHeight } from "src/constants/StyleConstants";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { User } from "src/views/DashboardPage/components/User";
import Logo from "src/assets/event.svg";
import { useMediaQuery } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { useSnackbar } from "notistack";

export const AppWrapper = ({ children }: ChrildrenProps) => {
  const dispatcher = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [opened, setOpened] = useState(false);
  const matches = useMediaQuery("(min-width: 500px)");

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

  const navbarItems = [
    {
      icon: <GridViewOutlinedIcon />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <CalendarTodayOutlinedIcon />,
      label: "Calendar",
      to: "/calendar",
    },
    {
      icon: <ArchiveOutlinedIcon />,
      label: "Past Events",
      to: "/pastevents",
    },
  ];

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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Group>
                <Image
                  src={Logo}
                  alt="Logo"
                  width={28}
                  imageProps={{ draggable: false }}
                />
                {matches && <Text size="md">Event Board</Text>}
              </Group>

              <Button
                variant="outline"
                leftIcon={<AddIcon />}
                onClick={() => {
                  enqueueSnackbar("This feature is not implemented yet.", {
                    variant: "info",
                  });
                }}
              >
                Create an Event
              </Button>
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
