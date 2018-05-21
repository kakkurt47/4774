export interface User {
  userId: number;
  name: string;
  profileImage: string;
}

export interface Artist extends User {
  area: string;
}
