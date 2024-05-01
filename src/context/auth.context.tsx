import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type TAuthContext = {
  account: any;
  isConnected?: boolean;
  chain: any;
  authenticationStatus?: string;
  setAuth?: Dispatch<SetStateAction<Omit<TAuthContext, "setAuth">>>;
};

export const AuthContext = createContext<TAuthContext>({
  account: null,
  isConnected: false,
  chain: null,
  authenticationStatus: "",
  setAuth: undefined,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Omit<TAuthContext, "setAuth">>({
    account: null,
    isConnected: false,
    chain: null,
    authenticationStatus: "",
  });

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
