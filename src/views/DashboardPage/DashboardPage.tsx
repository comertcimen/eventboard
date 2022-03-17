import {
  Card,
  Center,
  Image,
  Text,
  Group,
  Badge,
  Container,
  Menu,
  Divider,
  ActionIcon,
  Avatar,
  Dialog,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  fullName,
  nameAvatarize,
  smoothScrollTop,
  supabase,
  user,
} from "src/utils";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { PeopleAttending, EventActions, CardSkeletons } from "./components/";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useEvents } from "src/hooks/useEvents";
import { TRIGGEREVENTS } from "src/store/actions";
import { headerHeight } from "src/constants";
import { useMediaQuery } from "@mantine/hooks";

export const Dashboard = () => {
  const dispatcher = useDispatch();
  const { events, loading } = useEvents();
  const { enqueueSnackbar } = useSnackbar();
  const [newPost, setNewPost] = useState<boolean>(false);
  const isSmall = useMediaQuery("(max-width: 768px)");

  const deleteEvent = async (id: string) => {
    await supabase.from("people_attending").delete().match({ event_id: id });
    const { error } = await supabase.from("events").delete().match({ id });

    if (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
      return;
    }

    await dispatcher({ type: TRIGGEREVENTS });
  };

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
        {events &&
          events.length > 0 &&
          events.map((item) => (
            <Card shadow="sm" padding="lg" key={item.id} sx={{ width: "100%" }}>
              <Card.Section padding="md">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    padding: 20,
                    borderBottom: item.images
                      ? ""
                      : "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <Group>
                    <Avatar radius="xl" imageProps={{ draggable: false }}>
                      {nameAvatarize(
                        fullName(item.user.name, item.user.surname)
                      )}
                    </Avatar>
                    <Text weight={500}>
                      {fullName(item.user.name, item.user.surname)}
                    </Text>
                  </Group>

                  {user?.id === item.user_id && (
                    <Menu
                      control={
                        <ActionIcon variant="transparent">
                          <MoreHorizOutlinedIcon />
                        </ActionIcon>
                      }
                    >
                      <Menu.Label>Actions</Menu.Label>
                      <Menu.Item icon={<ModeEditOutlineOutlinedIcon />}>
                        Edit
                      </Menu.Item>
                      <Divider />
                      <Menu.Label>Danger zone</Menu.Label>

                      <Menu.Item
                        color="red"
                        icon={<DeleteOutlineOutlinedIcon />}
                        onClick={() => deleteEvent(item.id)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu>
                  )}
                </div>
              </Card.Section>

              {item.images && item.images.length === 1 && (
                <Card.Section>
                  <Image src={item.images[0]} fit="contain" alt={item.title} />
                </Card.Section>
              )}

              <Group
                noWrap={true}
                position="apart"
                style={{ marginBottom: 15, marginTop: 24 }}
              >
                <Text lineClamp={2} weight={500}>
                  {item.title}
                </Text>

                <Badge
                  sx={{ minWidth: "fit-content" }}
                  color={item.certainty === "certain" ? "green" : "pink"}
                  variant="light"
                >
                  {item.certainty}
                </Badge>
              </Group>

              <Text size="sm" style={{ lineHeight: 1.5 }}>
                {item.description}
              </Text>

              <Card.Section>
                <div
                  style={{
                    padding: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    size="sm"
                    sx={{
                      borderRadius: 32,
                      border: "1px solid transparent",
                      background: "rgb(241, 243, 245)",
                      padding: "3px 8px",
                    }}
                  >
                    {dayjs(item.event_date).format("D MMM YYYY HH:mm")}
                  </Text>

                  <PeopleAttending
                    count={item.people_attending.length}
                    peopleAttending={item?.people_attending}
                  />
                </div>
              </Card.Section>

              <EventActions
                id={item.id}
                attendingPeople={item.people_attending}
              />
            </Card>
          ))}
      </Center>
    </Container>
  );
};
