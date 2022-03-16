import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { nameAvatarize, supabase } from "src/utils";

export const User: FC = () => {
  const { classes, theme } = useStyles();
  const user = supabase.auth.user();

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
      <NavLink to={`/u/${user?.user_metadata.username}`}>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar radius="xl">
              {nameAvatarize(
                `${user?.user_metadata.name} ${user?.user_metadata.surname}`
              )}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {`${user?.user_metadata.name} ${user?.user_metadata.surname}`}
              </Text>
              <Text color="dimmed" size="xs">
                {user?.email}
              </Text>
            </div>

            <ChevronRightOutlinedIcon width={18} height={18} />
          </Group>
        </UnstyledButton>
      </NavLink>
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
