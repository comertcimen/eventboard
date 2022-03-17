import { Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "src/utils";

export const UserDetails = () => {
  let params = useParams();
  const [isUser, setIsUser] = useState<boolean>(true);

  //send request to retrieve user data
  //if no user, redirect to no user found page

  useEffect(() => {
    const ac = new AbortController();
    const getUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("username", params.id)
        .limit(1)
        .abortSignal(ac.signal)
        .single();

      if (error) {
        setIsUser(false);
        return;
      }

      console.log(data);
    };

    getUserData();
  }, [params.id]);

  if (!isUser) {
    return (
      <Center
        sx={{
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div>No users found!</div>
      </Center>
    );
  }
  return (
    <Center
      sx={{
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div>User {params.id}</div>
    </Center>
  );
};
