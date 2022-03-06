import { Button, Group } from "@mantine/core";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import { useMediaQuery } from "@mantine/hooks";

export const EventActions = () => {
  const isSmall = useMediaQuery("(max-width: 500px)");
  return (
    <Group
      noWrap={true}
      sx={{
        marginTop: 14,
        borderTop: "1px solid rgba(0,0,0,0.1)",
        paddingTop: 4,
        gap: isSmall ? 2 : 16,
      }}
    >
      <Button
        variant="subtle"
        color="gray"
        size={isSmall ? "xs" : "sm"}
        sx={{
          padding: isSmall ? 0 : "",
        }}
        fullWidth
        leftIcon={<ThumbUpOutlinedIcon />}
      >
        Attend
      </Button>
      <Button
        variant="subtle"
        color="gray"
        size={isSmall ? "xs" : "sm"}
        sx={{
          padding: isSmall ? 0 : "",
        }}
        fullWidth
        leftIcon={<ModeCommentOutlinedIcon />}
      >
        Comment
      </Button>
      <Button
        variant="subtle"
        color="gray"
        size={isSmall ? "xs" : "sm"}
        sx={{
          padding: isSmall ? 0 : "",
        }}
        fullWidth
        leftIcon={<BookmarksOutlinedIcon />}
      >
        Save
      </Button>
    </Group>
  );
};
