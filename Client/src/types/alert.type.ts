export interface AlertType {
  text: string;
  cname?: string;
  action: () => void;
}

