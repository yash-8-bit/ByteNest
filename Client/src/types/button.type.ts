import type { ReactNode } from "react";

export interface ButtonType {
  text: string;
  loading?: boolean;
  func: () => void;
  cname?: string;
}

export interface IconBtnType {
  icon1: ReactNode;
  isnormal: boolean;
  icon2?: ReactNode;
  func: () => void;
  cname?: string;
}
