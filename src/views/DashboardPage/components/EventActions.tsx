import { Button, Group } from "@mantine/core";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

export const EventActions = () => {
  return (
    <Group
      noWrap={true}
      sx={{
        marginTop: 14,
        borderTop: "1px solid rgba(0,0,0,0.1)",
        paddingTop: 4,
      }}
    >
      <Button
        variant="subtle"
        color="gray"
        fullWidth
        leftIcon={<ThumbUpOutlinedIcon />}
      >
        Attend
      </Button>
      <Button
        variant="subtle"
        color="gray"
        fullWidth
        leftIcon={<ModeCommentOutlinedIcon />}
      >
        Comment
      </Button>
      <Button
        variant="subtle"
        color="gray"
        fullWidth
        leftIcon={<BookmarksOutlinedIcon />}
      >
        Save
      </Button>
    </Group>
  );
};
