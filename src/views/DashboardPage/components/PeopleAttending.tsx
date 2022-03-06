import { Popover, Text } from "@mantine/core";
import { useState } from "react";

export const PeopleAttending = () => {
  const [tooltipOpened, setTooltipOpened] = useState<boolean>(false);
  return (
    <Popover
      opened={tooltipOpened}
      onClose={() => setTooltipOpened(false)}
      position="top"
      placement="center"
      noFocusTrap
      noEscape
      transition="pop-top-left"
      width={200}
      styles={{
        body: { pointerEvents: "none", background: "rgba(0,0,0,0.8)" },
      }}
      target={
        <Text
          size="sm"
          onMouseEnter={() => setTooltipOpened(true)}
          onMouseLeave={() => setTooltipOpened(false)}
          sx={{
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          8 Attending
        </Text>
      }
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text size="xs" color="white">
          Cömert Çimen
        </Text>
        <Text size="xs" color="white">
          Robin Horn
        </Text>
        <Text size="xs" color="white">
          Test Name 1
        </Text>
        <Text size="xs" color="white">
          Test Name 2
        </Text>
        <Text size="xs" color="white">
          Test Name 3
        </Text>
        <Text size="xs" color="white">
          Test Name 4
        </Text>
        <Text size="xs" color="white">
          Test Name 5
        </Text>
        <Text size="xs" color="white">
          Test Name 6
        </Text>
        <Text size="xs" color="white">
          Test Name 7
        </Text>
      </div>
    </Popover>
  );
};
