import React, { createContext, useEffect, useState } from "react";
import type { ThemeType } from "../types/context.type";
import ls from "../utils/ls.util";

const ThemeContext = createContext<ThemeType>({
  Theme: "light",
  ChangeTheme: () => {},
});

function Theme({ children }: { children: React.ReactNode }) {
  const [Theme, setTheme] = useState<"light" | "dark">("light");
  const ChangeTheme = () => {
    setTheme((t) => {
      ls.localThemeStore.set(t == "light" ? "dark" : "light");
      return t == "light" ? "dark" : "light";
    });
  };
  const run = (): void => {
    if (!ls.localThemeStore.get()) ls.localThemeStore.set("light");
    setTheme(ls.localThemeStore.get()! as "light" | "dark");
  };
  useEffect(() => {
    run();
  }, []);
  return (
    <ThemeContext.Provider value={{ Theme, ChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { Theme, ThemeContext };
