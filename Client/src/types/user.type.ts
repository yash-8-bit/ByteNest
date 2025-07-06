export interface UserFileType {
  id: string;
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
