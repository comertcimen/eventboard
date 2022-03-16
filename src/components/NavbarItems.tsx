import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

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
  {
    icon: <BookmarksOutlinedIcon />,
    label: "Saved",
    to: "/saved",
  },
  {
    icon: <ChatBubbleOutlineOutlinedIcon />,
    label: "Chat",
    to: "/chat",
  },
];
