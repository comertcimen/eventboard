import { useDispatch } from "react-redux";
import { LOGOUT } from "src/store/actions";

export const DashboardPage = () => {
  const dispatcher = useDispatch();

  const logOut = async () => {
    await dispatcher({
      type: LOGOUT,
      payload: {
        isLoggedIn: false,
        user: "",
        token: "",
      },
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
