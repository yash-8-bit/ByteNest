import React, { createContext, useState } from "react";
import type { Theme, WebappType } from "../types/context.type";

const Webappcontext = createContext<WebappType | undefined>(undefined);

function Webapp({ children }: { children: React.ReactNode }) {
  const [Theme, setTheme] = useState<Theme>("light");
  const ChangeTheme = () => setTheme((t) => (t == "light" ? "dark" : "light"));
  return (
    <Webappcontext.Provider value={{ Theme, ChangeTheme }}>
      {children}
    </Webappcontext.Provider>
  );
}

export { Webapp, Webappcontext };
