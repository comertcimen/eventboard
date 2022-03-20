import { Center, Container } from "@mantine/core";
import { useEvents } from "src/hooks";
import { CardSkeletons, Timeline } from "src/components";

export const PastEvents = () => {
  const { events, loading } = useEvents(true);

  return (
    <Container size="sm" padding="xs">
      <Center
        sx={{
          flexDirection: "column",
          gap: 40,
        }}
      >
        {loading && <CardSkeletons amount={5} />}
        <Timeline events={events} showActionButtons={false} showMenu={false} />
      </Center>
    </Container>
  );
};
