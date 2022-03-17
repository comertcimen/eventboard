import { TRIGGEREVENTS } from "./actions";
import { AnyAction } from "redux";

export const initialState = {
  triggerEvents: false,
};

export const eventReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TRIGGEREVENTS: {
      return {
        ...state,
        triggerEvents: !state.triggerEvents,
      };
    }
    default: {
      return { ...state };
    }
  }
};
