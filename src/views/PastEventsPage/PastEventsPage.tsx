import {
  Card,
  Center,
  Image,
  Text,
  Group,
  Badge,
  Container,
  Avatar,
} from "@mantine/core";
import { useState } from "react";
import { nameAvatarize } from "src/utils";
import dayjs from "dayjs";

interface DataType {
  id?: string;
  title?: string;
  description?: string;
  certainty?: string;
  date?: number;
  image?: string;
  userName?: string;
  createdAt?: number;
}

export const PastEvents = () => {
  const [data, setData] = useState<DataType[] | null>(null);

  /* useEffect(() => {
    const eventsRef = collection(db, "events");

    const unsubscribe = onSnapshot(eventsRef, (events) => {
      let tempData: DataType[] = [];

      events.docs.forEach((event) => {
        if (event.exists()) {
          const data = event.data();
          if (dayjs(data.date) < dayjs(new Date()))
            tempData.push({ id: event.id, ...data });
        }
      });

      const sortedData = tempData.sort((a, b) => {
        return dayjs(b.createdAt).diff(dayjs(a.createdAt));
      });

      setData(sortedData);
    });

    return unsubscribe;
  }, []); */

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
                    <Avatar radius="xl" imageProps={{ draggable: false }}>
                      {nameAvatarize(item.userName as string)}
                    </Avatar>
                    <Text weight={500}>{item.userName}</Text>
                  </Group>
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
                  color="pink"
                  variant="light"
                >
                  Passed
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
                </div>
              </Card.Section>
            </Card>
          ))}
      </Center>
    </Container>
  );
};
