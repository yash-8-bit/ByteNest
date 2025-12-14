export interface UserFileType {
  _id: string;
  name: string;
  url: string;
  filetype: string;
  username?: string;
}

export interface UserAuthType {
  name?: string;
  username: string;
  password: string;
}

export interface User {
  name: string;
  username: string;
}
