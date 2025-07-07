export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name: string;
  role: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  password: string;
  name: string;
  lastname: string;
  username: string;
  country: string;
  developerProfileId: string;
  registrationDate: string;
}
