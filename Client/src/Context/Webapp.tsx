import React, { createContext, useState } from "react";
import type { Theme, WebappType } from "../types/context.type";

const WebappContext = createContext<WebappType>({
  Theme: "light",
  ChangeTheme: () => {},
});

function Webapp({ children }: { children: React.ReactNode }) {
  const [Theme, setTheme] = useState<Theme>("light");
  const ChangeTheme = () => setTheme((t) => (t == "light" ? "dark" : "light"));
  return (
    <WebappContext.Provider value={{ Theme, ChangeTheme }}>
      {children}
    </WebappContext.Provider>
  );
}

export { Webapp, WebappContext };
