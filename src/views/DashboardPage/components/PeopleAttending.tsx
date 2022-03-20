import { Group, Popover, Text } from "@mantine/core";
import { FC, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AttendingPeopleInterface } from "src/constants";

type Props = {
  count: number;
  peopleAttending: AttendingPeopleInterface[];
  eventId: string;
};

export const PeopleAttending: FC<Props> = ({
  count,
  peopleAttending,
  eventId,
}) => {
  const [tooltipOpened, setTooltipOpened] = useState<boolean>(false);
  const [attendingNames /*, setAttendingNames*/] = useState<string[]>([]);

  const showTooltip = async () => {
    /* if (count > 0) {
      const { data, error } = await supabase
        .from("people_attending")
        .select("*, users!inner(*)");

      console.log(data);
    } */
  };

  if (count === 0) {
    return <></>;
  }

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
        <Group
          onMouseEnter={showTooltip}
          onMouseLeave={() => setTooltipOpened(false)}
          spacing={7}
        >
          <ThumbUpIcon
            sx={{
              background: "#228be6",
              color: "#fff",
              fontSize: "0.9rem",
              borderRadius: "50%",
              padding: "2px",
              cursor: "pointer",
            }}
          />
          <Text
            size="sm"
            sx={{
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
          >
            {`${count} Attending`}
          </Text>
        </Group>
      }
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {attendingNames.length > 0 &&
          attendingNames.map((name, index) => (
            <Text size="xs" color="white" key={index}>
              {name}
            </Text>
          ))}
      </div>
    </Popover>
  );
};
