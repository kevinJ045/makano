import React from "react";



export const Context = React.createContext<{
  currentMode: 'home' | 'archive',
  
}>({} as any);
