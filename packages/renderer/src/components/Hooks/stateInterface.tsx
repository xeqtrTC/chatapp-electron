export interface signupData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface signupDataFocus {
  username: boolean;
  email: boolean;
  password: boolean;
  repeatPassword: boolean;
}

export interface loginData {
  email: string;
  password: string;
}

export interface newUser {
  username: string;
  email: string;
  password: string;
}

export interface errorProps {
  error: string;
}

export interface searchUserArray {
  groups?: Array<searchUserProps>;
  displayName?: string;
  email?: string;
  uid?: string;
  [x: string]: any;
}

export interface searchUserProps {
  id: string;
}

export interface onClickSearchProps {
  displayName?: string;
  uid?: string;
}

export interface chatArray {
  groups?: Array<searchUserProps>;
  displayName?: string;
  createdBy?: string;
  email?: string;
  uid?: string;
  [x: string]: any;
}

export interface messageArray {
  sentBy?: string;
  messageText?: string;
  sendAt?: any;
  [id: string]: any;
}

export interface messageProps {
  sendBy?: string;
  messageText?: string;
  photoOfSender: string;
}
