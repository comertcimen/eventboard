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
} from "@mantine/core";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/utils";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { PeopleAttending, EventActions } from "./components/";
import { useSelector } from "react-redux";
import { State } from "src/store/accountReducer";

interface DataType {
  id?: string;
  title?: string;
  description?: string;
  certainty?: string;
  date?: number;
  image?: string;
  user?: string;
  createdAt?: number;
  peopleAttending?: string[];
}

export const Dashboard = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  const account = useSelector((state: State) => state.account);

  useEffect(() => {
    const eventsRef = collection(db, "events");

    const unsubscribe = onSnapshot(eventsRef, (events) => {
      let tempData: DataType[] = [];

      events.docs.forEach((event) => {
        if (event.exists()) {
          const data = event.data();
          tempData.push({ id: event.id, ...data });
        }
      });

      const sortedData = tempData.sort((a, b) => {
        return dayjs(b.createdAt).diff(dayjs(a.createdAt));
      });

      setData(sortedData);
    });

    return unsubscribe;
  }, []);

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  return (
    <Container size="sm" padding="xs">
      <Center
        sx={{
          flexDirection: "column",
          gap: 40,
        }}
      >
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <Card shadow="sm" padding="lg" key={item.id} sx={{ width: "100%" }}>
              <Card.Section padding="md">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    padding: 20,
                    borderBottom: item.image ? "" : "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <Group>
                    <Avatar
                      src="https://i.hizliresim.com/H5uEWE.jpg"
                      radius="xl"
                      imageProps={{ draggable: false }}
                    />
                    <Text weight={500}>Cömert Çimen</Text>
                  </Group>

                  {account.user.id === item.user && (
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
                        onClick={() => deleteEvent(item.id as string)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu>
                  )}
                </div>
              </Card.Section>

              {item.image && (
                <Card.Section>
                  <Image src={item.image} fit="contain" alt={item.title} />
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
                    {dayjs(item.date).format("D MMM YYYY HH:mm")}
                  </Text>

                  <PeopleAttending
                    count={
                      (item?.peopleAttending && item.peopleAttending.length) ||
                      0
                    }
                    peopleAttending={item?.peopleAttending || []}
                  />
                </div>
              </Card.Section>

              <EventActions
                id={item.id}
                me={account.user.id}
                attending={
                  item?.peopleAttending &&
                  item.peopleAttending.includes(account.user.id)
                }
              />
            </Card>
          ))}
      </Center>
    </Container>
  );
};
