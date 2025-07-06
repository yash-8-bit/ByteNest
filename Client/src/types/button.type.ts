import type { ReactNode } from "react";

type buttontype = "button" | "submit";

export interface ButtonType {
  text: string;
  loading?: boolean;
  func?: () => void;
  type?: buttontype;
  cname?: string;
}

export interface IconBtnType {
  icon1: ReactNode;
  isnormal?: boolean;
  icon2?: ReactNode;
  func?: () => void;
  cname?: string;
}
