export interface User {
  userId: number;
  name: string;
  profileImage: string;
  wallet?: string;
  jwt?: string;
}

export interface Artist extends User {
  area: string;
}
