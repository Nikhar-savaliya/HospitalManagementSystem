import { ReactNode, createContext, useState } from "react";

interface UserContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const userContext = createContext<UserContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUser: () => {},
  user: {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(false);

  return (
    <userContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
