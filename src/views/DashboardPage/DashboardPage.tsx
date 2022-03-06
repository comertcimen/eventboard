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
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/utils";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { PeopleAttending, EventActions } from "./components/";

interface DataType {
  title?: string;
  description?: string;
  certainty?: string;
  date?: number;
  image?: string;
  user?: string;
  createdAt?: number;
}

export const Dashboard = () => {
  const [data, setData] = useState<DataType[] | null>(null);

  useEffect(() => {
    const eventsRef = collection(db, "events");

    const unsubscribe = onSnapshot(eventsRef, (events) => {
      let tempData: DataType[] = [];

      events.docs.forEach((event) => {
        if (event.exists()) {
          tempData.push(event.data());
        }
      });

      const sortedData = tempData.sort((a, b) => {
        return dayjs(b.createdAt).diff(dayjs(a.createdAt));
      });

      setData(sortedData);
    });

    return unsubscribe;
  }, []);

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
          data.map((item, index) => (
            <Card shadow="sm" padding="lg" key={index} sx={{ width: "100%" }}>
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

                  <Menu
                    control={
                      <ActionIcon variant="transparent">
                        <MoreHorizOutlinedIcon />
                      </ActionIcon>
                    }
                  >
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item icon={<SettingsOutlinedIcon />}>
                      Settings
                    </Menu.Item>
                    <Divider />
                    <Menu.Label>Danger zone</Menu.Label>

                    <Menu.Item color="red" icon={<DeleteOutlineOutlinedIcon />}>
                      Delete event
                    </Menu.Item>
                  </Menu>
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

                  <PeopleAttending />
                </div>
              </Card.Section>

              <EventActions />
            </Card>
          ))}
      </Center>
    </Container>
  );
};
