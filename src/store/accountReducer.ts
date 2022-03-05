import { LOGIN, LOGOUT } from "./actions";
import { AnyAction } from "redux";

export type State = {
  account: {
    token: string;
    isLoggedIn: boolean;
    user: any;
  };
};

export const initialState = {
  token: "",
  isLoggedIn: false,
  user: null,
};

const accountReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
