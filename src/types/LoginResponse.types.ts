export interface LoginResponse {
  success: boolean;
  description: string;
  data: {
    user: {
      id: string;
      createdAt: string;
      email: string;
      refreshToken: string | null;
      theme: string;
      streakCount: number;
      lastActiveDate: string | null;
      updatedAt: string;
    };
    access_token: string;
  };
}
