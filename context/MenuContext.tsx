'use client';
import React, { Children, createContext, useState } from "react";

export const MenuContext = createContext;

export default function MenuContextProvider() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    console.log("diclick");
    setOpen(prev => !prev);
  };

  return <MenuContext.Provider value={{open, toggle}}>
    {Children}
  </MenuContext.Provider>
}
