import { createContext } from "react";
import { UserInfo } from "@/app/util/auth";

type UserContextType = {
  user?: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
  notifyError: (error: any) => void;
};
export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  notifyError: (error) => console.log(error),
});
