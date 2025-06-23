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
  name: string;
  role: string;
}
