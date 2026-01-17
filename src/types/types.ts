export interface LoginBody {
  password: string;
  username: string;
}

export interface MessageBody {
  text: string;
  title: string;
}

export interface RegisterBody {
  confirmPassword: string;
  fullname: string;
  password: string;
  username: string;
}

export interface ResultBody {
  result: string;
}

export interface User {
  admin: boolean;
  fullname: string;
  membership: boolean;
  password: string;
  user_id: number;
  username: string;
}
