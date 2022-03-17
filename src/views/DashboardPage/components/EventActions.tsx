import { Button, Group } from "@mantine/core";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import { AttendingPeopleInterface } from "src/constants";
import { supabase, user } from "src/utils";

type Props = {
  id: string;
  attendingPeople: AttendingPeopleInterface[];
};

export const EventActions: FC<Props> = ({ id, attendingPeople }) => {
  const isSmall = useMediaQuery("(max-width: 500px)");

  const filtered = attendingPeople.filter((item) => item.user_id === user?.id);
  const amIAttending = filtered.length > 0;

  const handleAttend = async () => {
    if (amIAttending) {
      await supabase.from("people_attending").delete().match({ event_id: id });
    } else {
      await supabase
        .from("people_attending")
        .insert([{ user_id: user?.id, event_id: id }]);
    }
  };
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
        color={amIAttending ? "blue" : "gray"}
        size={isSmall ? "xs" : "sm"}
        sx={{
          padding: isSmall ? 0 : "",
        }}
        fullWidth
        leftIcon={amIAttending ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
        onClick={handleAttend}
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
        leftIcon={<BookmarkBorderOutlinedIcon />}
      >
        Save
      </Button>
    </Group>
  );
};
