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

export interface User {
  fullname: string;
  user_id: number;
  username: string;
}
