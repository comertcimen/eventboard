import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { FC } from "react";
import { useSelector } from "react-redux";
import { State } from "src/store/accountReducer";

export const User: FC = () => {
  const { classes, theme } = useStyles();
  const account = useSelector((state: State) => state.account);
  const { user } = account;

  const nameAvatarize = () => {
    const seperate = user.name.split(" ");
    return seperate.length === 1
      ? seperate[0][0]
      : `${seperate[0][0]}${seperate[1][0]}`;
  };

  return (
    <div
      style={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar radius="xl"> {nameAvatarize()}</Avatar>
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.name}
            </Text>
            <Text color="dimmed" size="xs">
              {user.email}
            </Text>
          </div>

          <ChevronRightOutlinedIcon width={18} height={18} />
        </Group>
      </UnstyledButton>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));
