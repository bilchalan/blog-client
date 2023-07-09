export type UserDto = {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
};
