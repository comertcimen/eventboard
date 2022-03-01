import { useDispatch } from "react-redux";
import { auth } from "src/utils";
import { LOGOUT } from "src/store/actions";
import { signOut } from "firebase/auth";

export const DashboardPage = () => {
  const dispatcher = useDispatch();

  const logOut = async () => {
    signOut(auth)
      .then(async () => {
        await dispatcher({
          type: LOGOUT,
          payload: {
            isLoggedIn: false,
            user: "",
            token: "",
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div>Dashboard Page</div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};
