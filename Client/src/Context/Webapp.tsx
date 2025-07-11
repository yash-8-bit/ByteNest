import React, { createContext, useEffect, useState } from "react";
import type { WebappType } from "../types/context.type";
import ls from "../utils/ls.logic";

const WebappContext = createContext<WebappType>({
  Theme: "light",
  ChangeTheme: () => {},
});

function Webapp({ children }: { children: React.ReactNode }) {
  const [Theme, setTheme] = useState<string>("");
  const ChangeTheme = () => {
    setTheme((t) => {
      ls.ls2.set(t == "light" ? "dark" : "light");
      return t == "light" ? "dark" : "light";
    });
  };
  const run = (): void => {
    if (!ls.ls2.get()) ls.ls2.set("light");
    setTheme(ls.ls2.get()!);
  };
  useEffect(() => {
    run();
  }, []);
  return (
    <WebappContext.Provider value={{ Theme, ChangeTheme }}>
      {children}
    </WebappContext.Provider>
  );
}

export { Webapp, WebappContext };
