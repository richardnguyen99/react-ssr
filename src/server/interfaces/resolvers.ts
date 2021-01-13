export interface RegisterArgs {
  username: string;
  email: string;
  password: string;

  lastname?: string;
  firstname?: string;
}

export interface LoginArgs {
  username: string;
  password: string;
}

type Role = "ADMIN" | "USER";

export interface UserArgs {
  username: string;
  role?: Role;
}
