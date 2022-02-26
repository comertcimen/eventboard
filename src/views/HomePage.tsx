import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { State } from "src/store/accountReducer";
import {
  Checkbox,
  Image,
  PasswordInput,
  TextInput,
  Text,
  Button,
  Loader,
} from "@mantine/core";
import Logo from "src/assets/people.svg";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { ACCOUNT_INITIALIZE } from "src/store/actions";

export const HomePage = () => {
  const account = useSelector((state: State) => state.account);
  const dispatcher = useDispatch();
  const [loginOrRegister, setLoginOrRegister] = useState(true); //true => login : false => register
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = account;
  const borderRadius = 6;

  const handleLogin = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      await dispatcher({
        type: ACCOUNT_INITIALIZE,
        payload: {
          isLoggedIn: true,
          user: "comertcimen",
          token: "account",
        },
      });
    }, 2000);
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const switchToRegisterView = () => {
    setLoginOrRegister(false);
    //Clear register and login input fields
  };

  const switchToLoginView = () => {
    setLoginOrRegister(true);
    //Clear register and login input fields
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#ebedf1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "70%",
          height: "70%",
        }}
      >
        <div
          style={{
            width: "50%",
            minWidth: "50%",
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            background: "#f2f4f5",
          }}
        >
          {loginOrRegister ? (
            <div
              style={{
                padding: "3rem 3rem",
                display: "flex",
                flexDirection: "column",
                rowGap: "1.5rem",
              }}
            >
              <TextInput
                label="Email"
                name="email"
                required
                type="email"
                icon={<MailOutlineIcon />}
              />

              <PasswordInput
                label="Password"
                required
                icon={<LockOutlinedIcon />}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Checkbox label="Remember me" />
                <Text size="sm" color="blue" sx={{ cursor: "pointer" }}>
                  Forgot password?
                </Text>
              </div>

              <Button fullWidth onClick={handleLogin}>
                {loading ? <Loader size="sm" color="lime" /> : "Login"}
              </Button>

              <span style={{ display: "flex", columnGap: 5 }}>
                <Text size="sm" color="grey">
                  Not registered yet?
                </Text>

                <Text
                  size="sm"
                  color="blue"
                  sx={{ cursor: "pointer" }}
                  onClick={switchToRegisterView}
                >
                  Create an account
                </Text>
              </span>
            </div>
          ) : (
            <div
              style={{
                padding: "3rem 3rem",
                display: "flex",
                flexDirection: "column",
                rowGap: "1.5rem",
              }}
            >
              <TextInput
                label="Name"
                name="name"
                required
                type="text"
                icon={<CreateOutlinedIcon />}
              />

              <TextInput
                label="Surname"
                name="surname"
                required
                type="text"
                icon={<CreateOutlinedIcon />}
              />

              <TextInput
                label="Email"
                name="email"
                required
                type="email"
                icon={<MailOutlineIcon />}
              />

              <PasswordInput
                label="Password"
                required
                icon={<LockOutlinedIcon />}
              />

              <PasswordInput
                label="Confirm Password"
                required
                icon={<LockOutlinedIcon />}
              />

              <Button fullWidth onClick={handleRegister}>
                {loading ? <Loader size="sm" color="lime" /> : "Register"}
              </Button>

              <span style={{ display: "flex", columnGap: 5 }}>
                <Text size="sm" color="grey">
                  Already have an account?
                </Text>

                <Text
                  size="sm"
                  color="blue"
                  sx={{ cursor: "pointer" }}
                  onClick={switchToLoginView}
                >
                  Login
                </Text>
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            width: "50%",
            minWidth: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background: "#f2f4f5",
            rowGap: "1rem",
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            borderLeft: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Image width={500} src={Logo} alt="People" />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "2em",
              color: "#061237",
              marginTop: "1.5rem",
            }}
          >
            Event Board
          </span>

          <span style={{ color: "#B7BAC7" }}>
            Share events, find events, have fun.
          </span>
        </div>
      </div>
    </div>
  );
};
