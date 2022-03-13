import { Button, Group } from "@mantine/core";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import {
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "src/utils";

type Props = {
  id: string | undefined;
  me: string | undefined;
  attending: boolean | undefined;
};

export const EventActions: FC<Props> = ({ id, me, attending }) => {
  const isSmall = useMediaQuery("(max-width: 500px)");

  const eventRef = doc(db, "events", id as string);

  const handleAttend = async () => {
    const docSnap = await getDoc(eventRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data?.peopleAttending && data.peopleAttending.includes(me)) {
        await updateDoc(eventRef, {
          peopleAttending: arrayRemove(me),
        });
      } else {
        await updateDoc(eventRef, {
          peopleAttending: arrayUnion(me),
        });
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
        color={attending ? "blue" : "gray"}
        size={isSmall ? "xs" : "sm"}
        sx={{
          padding: isSmall ? 0 : "",
        }}
        fullWidth
        leftIcon={attending ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
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
