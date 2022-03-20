import {
  ActionIcon,
  Avatar,
  Card,
  Divider,
  Group,
  Menu,
  Text,
  Image,
  Badge,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";
import { EventInterface } from "src/constants";
import { fullName, nameAvatarize, supabase } from "src/utils";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import dayjs from "dayjs";
import {
  EventActions,
  PeopleAttending,
} from "src/views/DashboardPage/components";
import { CardSkeletons } from "src/components";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { TRIGGEREVENTS } from "src/store/actions";
import { Link } from "react-router-dom";

type Props = {
  events: EventInterface[] | null;
  showActionButtons?: boolean;
  showMenu?: boolean;
  page?: "dashboard" | "saved" | "pastevents";
};

export const Timeline: FC<Props> = ({
  events,
  showActionButtons = true,
  showMenu = true,
  page = "dashboard",
}) => {
  const user = supabase.auth.user();
  const { enqueueSnackbar } = useSnackbar();
  const dispatcher = useDispatch();
  const theme = useMantineTheme();

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

  if (events && events.length === 0) {
    return (
      <Group direction="column" sx={{ width: "100%" }} align="center">
        <CardSkeletons amount={1} animate={false} />
        <Title order={2} sx={{ color: theme.colors.dark[3] }}>
          No Results Found
        </Title>
        <Text size="sm" sx={{ color: theme.colors.dark[3] }}>
          {page !== "saved"
            ? "No events shared so far."
            : "No saved event found"}
        </Text>
      </Group>
    );
  }
  return (
    <>
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
                  borderBottom: item.images ? "" : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <Group>
                  <Avatar radius="xl" imageProps={{ draggable: false }}>
                    {nameAvatarize(fullName(item.user.name, item.user.surname))}
                  </Avatar>
                  <Link to={`/u/${item.user.username}`}>
                    <Text
                      weight={500}
                      sx={{ ":hover": { textDecoration: "underline" } }}
                    >
                      {fullName(item.user.name, item.user.surname)}
                    </Text>
                  </Link>
                </Group>

                {showMenu && user?.id === item.user_id && (
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
                  eventId={item.id}
                />
              </div>
            </Card.Section>

            {showActionButtons && (
              <EventActions
                id={item.id}
                attendingPeople={item.people_attending}
                ownerUsername={item.user.username}
              />
            )}
          </Card>
        ))}
    </>
  );
};
