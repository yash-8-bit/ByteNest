export interface UserFileType {
  _id: string;
  filename: string;
  pathurl: string;
  filepublicid: string;
  filetype: string;
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
