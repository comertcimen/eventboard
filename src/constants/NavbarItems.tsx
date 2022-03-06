import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

export const navbarItems = [
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
