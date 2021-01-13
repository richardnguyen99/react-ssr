/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * User authentication context to store and handle user states
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React, { createContext, useReducer } from "react";

import createReducer from "@common/utils/createReducer";

interface UserState {
  username: string;
  email: string;
  isLoggedIn: boolean;
}

type Payload = {
  type: string;
  payload: UserState;
};

const initialState: UserState = {
  username: "",
  email: "",
  isLoggedIn: false,
};

export const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<Payload>;
}>({
  state: initialState,
  dispatch: () => {},
});

const authReducer = createReducer<UserState>(initialState, {
  LOGGED_IN: (_state, payload) => ({
    isLoggedIn: true,
    username: payload.username,
    email: payload.email,
  }),
  LOG_OUT: (_state, _payload) => ({
    isLoggedIn: false,
    username: "",
    email: "",
  }),
});

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
