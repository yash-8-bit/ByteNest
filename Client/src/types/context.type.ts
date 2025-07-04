export type Theme = "light" | "dark";

export interface WebappType {
  Theme: Theme;
  ChangeTheme: () => void;
}
