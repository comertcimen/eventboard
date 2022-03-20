import { Button, Group } from "@mantine/core";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useState } from "react";
import { AttendingPeopleInterface } from "src/constants";
import { supabase } from "src/utils";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  attendingPeople: AttendingPeopleInterface[];
  ownerUsername: string;
};

export const EventActions: FC<Props> = ({
  id,
  attendingPeople,
  ownerUsername,
}) => {
  const isSmall = useMediaQuery("(max-width: 500px)");
  const user = supabase.auth.user();
  const filtered = attendingPeople.filter((item) => item.user_id === user?.id);
  const [amIAttending, setAmIAttending] = useState<boolean>(
    filtered.length > 0
  );
  const navigate = useNavigate();

  const handleAttend = async () => {
    if (amIAttending) {
      const { error } = await supabase
        .from("people_attending")
        .delete()
        .match({ event_id: id });

      if (!error) {
        setAmIAttending(false);
      }
    } else {
      const { error } = await supabase
        .from("people_attending")
        .insert([{ user_id: user?.id, event_id: id }]);

      if (!error) {
        setAmIAttending(true);
      }
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
        onClick={() => navigate(`/u/${ownerUsername}/events/${id}`)}
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
