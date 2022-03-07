import { Group, Popover, Text } from "@mantine/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { db } from "src/utils";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

type Props = {
  count: number;
  peopleAttending: string[];
};

export const PeopleAttending: FC<Props> = ({ count, peopleAttending }) => {
  const [tooltipOpened, setTooltipOpened] = useState<boolean>(false);
  const [attendingNames, setAttendingNames] = useState<string[]>([]);

  useEffect(() => {
    const getAttendingPeopleNames = async () => {
      if (peopleAttending.length > 0) {
        const names: string[] = [];

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("__name__", "in", peopleAttending)); //TODO: this only works with max 10 people, find a better way
        const data = await getDocs(q);

        data.docs.forEach((user) => {
          const userData = user.data();
          names.push(`${userData.name} ${userData.surname}`);
        });

        setAttendingNames(names);
      }
    };

    getAttendingPeopleNames();
  }, [peopleAttending]);

  if (peopleAttending.length === 0) {
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
          onMouseEnter={() => setTooltipOpened(true)}
          onMouseLeave={() => setTooltipOpened(false)}
          spacing={7}
        >
          <ThumbUpIcon
            sx={{ color: "#228be6", fontSize: "1.1rem", cursor: "pointer" }}
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
