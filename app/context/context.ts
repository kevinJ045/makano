import React from "react";



export const Context = React.createContext<{
  login: {
    username: string
  } | null,
  setLogin: (login: any) => void
}>({} as any);
