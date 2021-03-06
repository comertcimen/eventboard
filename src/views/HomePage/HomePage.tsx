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
  SimpleGrid,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import Logo from "src/assets/people.svg";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { LOGIN } from "src/store/actions";
import { auth, db } from "src/utils";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { FormTypes } from "src/constants/FormTypes";
import { useSnackbar } from "notistack";
import { loginFormCardBorderRadius as borderRadius } from "src/constants/StyleConstants";

export const HomePage = () => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const account = useSelector((state: State) => state.account);
  const { isLoggedIn } = account;
  const dispatcher = useDispatch();
  const [formType, setFormType] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState<boolean>(false);

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (value) =>
        new RegExp("^\\w+([-+.']w+)*@uos.de$").test(value) ||
        new RegExp("^\\w+([-+.']w+)*@uni-osnabrueck.de$").test(value),
      password: (value) => value !== "",
    },

    errorMessages: {
      email: "Email must be a valid uni email",
      password: "Password must be filled",
    },
  });

  const registerForm = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
    },

    validationRules: {
      email: (value) =>
        new RegExp("^\\w+([-+.']w+)*@uos.de$").test(value) ||
        new RegExp("^\\w+([-+.']w+)*@uni-osnabrueck.de$").test(value),
      password: (value) =>
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_???]).{8,16}$/.test(
          value
        ),
      confirmPassword: (val, values) =>
        formType === "login" || val === values?.password,
      name: (val) => val.length >= 2,
      surname: (val) => val.length >= 2,
    },

    errorMessages: {
      email: "Email must be a valid uni email",
      password:
        "Enter a combination of at least six letters(uppercase and lowercase), numbers, and special characters !@#$%^&*()--+={}",
      confirmPassword: "Passwords don't match. Try again",
      name: "Name must be longer than 1 character",
      surname: "Surname must be longer than 1 character",
    },
  });

  const handleLogin = (values: { email: string; password: string }) => {
    const { email, password } = values;
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        if (!user.emailVerified) {
          signOut(auth);
          enqueueSnackbar("Please verify your email.", {
            variant: "warning",
          });
          setLoading(false);
          return;
        }

        await dispatcher({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: { email: user.email, name: user.displayName, id: user.uid },
          },
        });
        setLoading(false);
        return;
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });

        setLoading(false);
      });
  };

  const handleRegister = (values: FormTypes) => {
    const { email, password, name, surname } = values;
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: `${name} ${surname}`,
        });

        //TODO: change uid with email.slice(0, email.indexOf('@'))

        await setDoc(doc(db, "users", user.uid), {
          email: email,
          name: name,
          surname: surname,
          createdAt: Timestamp.now(),
        });

        sendEmailVerification(user);
        enqueueSnackbar(
          "Account is created. Please verify your email to login.",
          {
            variant: "success",
          }
        );
        registerForm.reset();
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        setLoading(false);
      });
  };

  const switchToRegisterView = () => {
    setFormType("register");
    loginForm.reset();
  };

  const switchToLoginView = () => {
    setFormType("login");
    registerForm.reset();
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.gridWrapper}>
          <SimpleGrid
            cols={2}
            spacing={0}
            className={classes.maxWidthHeight}
            breakpoints={[{ maxWidth: 1200, cols: 1 }]}
          >
            <div className={classes.form}>
              <form
                onSubmit={
                  formType === "login"
                    ? loginForm.onSubmit(handleLogin)
                    : registerForm.onSubmit(handleRegister)
                }
                className={classes.loginForm}
              >
                {formType === "login" && (
                  <>
                    <TextInput
                      label="Email"
                      name="email"
                      data-autofocus
                      required
                      type="email"
                      icon={<MailOutlineIcon />}
                      onBlur={() => loginForm.validateField("email")}
                      {...loginForm.getInputProps("email")}
                    />

                    <PasswordInput
                      label="Password"
                      name="password"
                      required
                      icon={<LockOutlinedIcon />}
                      onBlur={() => loginForm.validateField("password")}
                      {...loginForm.getInputProps("password")}
                    />

                    <div className={classes.forgotPassword}>
                      <Checkbox
                        label="Remember me"
                        onClick={() => {
                          enqueueSnackbar(
                            "This feature is not implemented yet. It will remember until you clear history",
                            {
                              variant: "info",
                            }
                          );
                        }}
                      />
                      <Text size="sm" color="blue" className={classes.pointer}>
                        Forgot password?
                      </Text>
                    </div>

                    <Button fullWidth type="submit">
                      {loading ? <Loader size="sm" color="lime" /> : "Login"}
                    </Button>

                    <span className={classes.notRegistered}>
                      <Text size="sm" color="grey">
                        Not registered yet?
                      </Text>

                      <Text
                        size="sm"
                        color="blue"
                        className={classes.pointer}
                        onClick={switchToRegisterView}
                      >
                        Create an account
                      </Text>
                    </span>
                  </>
                )}

                {formType === "register" && (
                  <>
                    <TextInput
                      label="Name"
                      name="name"
                      required
                      type="text"
                      data-autofocus
                      icon={<CreateOutlinedIcon />}
                      onBlur={() => registerForm.validateField("name")}
                      {...registerForm.getInputProps("name")}
                    />

                    <TextInput
                      label="Surname"
                      name="surname"
                      required
                      type="text"
                      icon={<CreateOutlinedIcon />}
                      onBlur={() => registerForm.validateField("surname")}
                      {...registerForm.getInputProps("surname")}
                    />

                    <TextInput
                      label="Email"
                      name="email"
                      required
                      type="email"
                      icon={<MailOutlineIcon />}
                      onBlur={() => registerForm.validateField("email")}
                      {...registerForm.getInputProps("email")}
                    />

                    <PasswordInput
                      label="Password"
                      name="password"
                      required
                      icon={<LockOutlinedIcon />}
                      onBlur={() => registerForm.validateField("password")}
                      {...registerForm.getInputProps("password")}
                    />

                    <PasswordInput
                      label="Confirm Password"
                      name="confirmpassword"
                      required
                      icon={<LockOutlinedIcon />}
                      onBlur={() =>
                        registerForm.validateField("confirmPassword")
                      }
                      {...registerForm.getInputProps("confirmPassword")}
                    />

                    <Button fullWidth type="submit">
                      {loading ? <Loader size="sm" color="lime" /> : "Register"}
                    </Button>

                    <span style={{ display: "flex", columnGap: 5 }}>
                      <Text size="sm" color="grey">
                        Already have an account?
                      </Text>

                      <Text
                        size="sm"
                        color="blue"
                        className={classes.pointer}
                        onClick={switchToLoginView}
                      >
                        Login
                      </Text>
                    </span>
                  </>
                )}
              </form>
            </div>
            <div className={classes.rightSide}>
              <Image src={Logo} alt="People" sx={{ width: "80%" }} />
              <span className={classes.title}>Event Board</span>

              <span className={classes.description}>
                Share events, find events, have fun.
              </span>
            </div>
          </SimpleGrid>
        </div>
      </div>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    background: "#ebedf1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [`@media (min-width: 1200px)`]: {
      height: "100vh",
    },
  },
  gridWrapper: {
    width: "70%",
    [`@media (min-width: 1200px)`]: {
      height: "70%",
    },

    [`@media (max-width: 1200px)`]: {
      padding: "2rem 0",
    },

    [`@media (max-width: 900px)`]: {
      width: "90%",
    },
  },
  maxWidthHeight: {
    height: "100%",
    maxHeight: "100%",
  },
  form: {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    background: "#f2f4f5",
  },
  loginForm: {
    padding: "3rem",
    display: "flex",
    flexDirection: "column",
    rowGap: "1.5rem",
  },
  forgotPassword: {
    display: "flex",
    justifyContent: "space-between",
  },
  notRegistered: {
    display: "flex",
    columnGap: 5,
  },
  pointer: {
    cursor: "pointer",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#f2f4f5",
    rowGap: "1rem",
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderLeft: "1px solid rgba(0,0,0,0.05)",
  },
  title: {
    fontWeight: "bold",
    fontSize: "2em",
    color: "#061237",
    marginTop: "1.5rem",
  },
  description: {
    color: "#B7BAC7",
    marginBottom: "1rem",
  },
}));
