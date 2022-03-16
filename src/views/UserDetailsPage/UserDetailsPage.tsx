import { Center } from "@mantine/core";
import { useParams } from "react-router-dom";

export const UserDetails = () => {
  let params = useParams();

  //send request to retrieve user data
  //if no user, redirect to no user found page
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
