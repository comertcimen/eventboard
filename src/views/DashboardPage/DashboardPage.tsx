import { Center, Text, Container, Dialog } from "@mantine/core";
import { useEffect, useState } from "react";
import { smoothScrollTop, supabase } from "src/utils";
import { CardSkeletons } from "src/components";
import { useDispatch } from "react-redux";
import { useEvents } from "src/hooks";
import { TRIGGEREVENTS } from "src/store/actions";
import { headerHeight } from "src/constants";
import { useMediaQuery } from "@mantine/hooks";
import { Timeline } from "src/components/";

export const Dashboard = () => {
  const dispatcher = useDispatch();
  const { events, loading } = useEvents();

  const [newPost, setNewPost] = useState<boolean>(false);
  const isSmall = useMediaQuery("(max-width: 768px)");
  const user = supabase.auth.user();

  const handleNewPost = async () => {
    await dispatcher({ type: TRIGGEREVENTS });
    setNewPost(false);
    smoothScrollTop();
  };

  useEffect(() => {
    supabase
      .from("events")
      .on("INSERT", (payload) => {
        if (payload.new.user_id !== user?.id) {
          setNewPost(true);
        }
      })
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container size="sm" padding="xs">
      <Dialog
        opened={newPost}
        onClick={handleNewPost}
        size="sm"
        radius="xl"
        transition="slide-down"
        sx={{ textAlign: "center", cursor: "pointer" }}
        position={{
          top: headerHeight + 10,
          left: isSmall ? "calc(50% - 100px)" : "calc(50% + 50px)",
        }}
      >
        <Text size="sm">New events available</Text>
      </Dialog>

      <Center
        sx={{
          flexDirection: "column",
          gap: 40,
        }}
      >
        {loading && <CardSkeletons amount={5} />}

        <Timeline events={events} />
      </Center>
    </Container>
  );
};
