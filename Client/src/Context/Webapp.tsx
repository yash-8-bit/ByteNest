import React, { createContext, useEffect, useState } from "react";
import type { WebappType } from "../types/context.type";
import ls from "../utils/ls.util";

const WebappContext = createContext<WebappType>({
  Theme: "light",
  ChangeTheme: () => {},
});

function Webapp({ children }: { children: React.ReactNode }) {
  const [Theme, setTheme] = useState<"light" | "dark">("light");
  const ChangeTheme = () => {
    setTheme((t) => {
      ls.ls2.set(t == "light" ? "dark" : "light");
      return t == "light" ? "dark" : "light";
    });
  };
  const run = (): void => {
    if (!ls.ls2.get()) ls.ls2.set("light");
    setTheme(ls.ls2.get()! as "light" | "dark");
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
