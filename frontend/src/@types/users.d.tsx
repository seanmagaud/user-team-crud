export interface IUser {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  role: number;
}

export interface EditUserProps {
  onClick: any;
  demote: any;
  promote: any;
}

export interface UserProps {
  user: UserType;
  onClick: any;
}

export type UserContextType = {
  users: IUser[];
};

export type UserSubmitForm = {
  firstname: string;
  lastname: string;
  email: string;
};

export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  teams: any;
};
