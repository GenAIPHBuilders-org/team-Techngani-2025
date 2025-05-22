export type User = {
  name: string;
  id: number;
  email: string;
  bio: string | null;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};
