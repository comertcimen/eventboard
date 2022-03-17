import { Group, Popover, Text } from "@mantine/core";
import { FC, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AttendingPeopleInterface } from "src/constants";

type Props = {
  count: number;
  peopleAttending: AttendingPeopleInterface[];
};

export const PeopleAttending: FC<Props> = ({ count, peopleAttending }) => {
  const [tooltipOpened, setTooltipOpened] = useState<boolean>(false);
  const [attendingNames, setAttendingNames] = useState<string[]>([]);

  const showTooltip = async () => {
    /* if (peopleAttending.length > 0) {
      const names: string[] = [];

      const usersRef = collection(db, "users");

      let promises: Promise<DocumentData>[] = [];

      peopleAttending.forEach(async (item) => {
        const q = query(usersRef, where("__name__", "==", item));
        promises.push(getDocs(q));
      });

      Promise.all(promises)
        .then((results) => {
          results.forEach((result) => {
            const userData = result.docs[0].data();
            names.push(`${userData.name} ${userData.surname}`);
          });
        })
        .then(() => {
          setAttendingNames(names);
          setTooltipOpened(true);
        });
    } */
  };

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
          onMouseEnter={showTooltip}
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
