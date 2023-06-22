import { createContext } from "react";
import { UserInfo } from "@/app/util/auth";
import { Schema } from "prismadesign-lib";

type UserContextType = {
  user?: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
  setSchema: React.Dispatch<React.SetStateAction<Schema>>;
  notifyError: (error: any) => void;
};
export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  setSchema: () => {},
  notifyError: (error) => console.log(error),
});
