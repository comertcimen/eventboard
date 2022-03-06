import { LOGIN, LOGOUT } from "./actions";
import { AnyAction } from "redux";

export type State = {
  account: {
    isLoggedIn: boolean;
    user: {
      email: string;
      name: string;
      id: string;
    };
  };
};

export const initialState = {
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
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
