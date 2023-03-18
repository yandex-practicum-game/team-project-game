export type SigninRequest = {
  login: string;
  password: string;
};

export type SingupRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  confirm_password?: string;
  phone: string;
};
