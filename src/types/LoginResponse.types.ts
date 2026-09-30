export interface LoginResponse {
  success: boolean;
  description: string;
  data: {
    user: { id: string; email: string };
    access_token: string;
    // refresh_token: string;
  };
}
