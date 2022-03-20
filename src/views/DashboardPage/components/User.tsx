import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { nameAvatarize, supabase } from "src/utils";
import { UserInterface } from "src/constants";

export const User: FC = () => {
  const { classes, theme } = useStyles();
  type TempUserType = UserInterface | null;
  const [userData, setUserData] = useState<TempUserType>(null);
  const [profilePic, setProfilePic] = useState<string>("");

  const user = supabase.auth.user();

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id,
        created_at: "",
        updated_at: "",
        username: user.user_metadata.username,
        email: user.email || "",
        name: user.user_metadata.name,
        surname: user.user_metadata.surname,
      });
    }

    const ac = new AbortController();

    const getProfileData = async () => {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("id", user?.id)
        .limit(1)
        .abortSignal(ac.signal)
        .single();

      setProfilePic(data.avatar_url);

      if (!user) {
        setUserData(data);
      }
    };

    getProfileData();

    return () => ac.abort();
  }, [user]);

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
      <NavLink to={`/u/${userData?.username}`}>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar radius="xl" src={profilePic}>
              {nameAvatarize(
                `${userData?.name || ""} ${userData?.surname || ""}`
              )}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {`${userData?.name || ""} ${userData?.surname || ""}`}
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
