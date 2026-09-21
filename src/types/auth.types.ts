export interface LoginProps {
  onLoginSuccess: () => void;
  switchToRegister: () => void;
  switchToHome: () => void;
}

export interface RegistrationProps {
  onRegisterSuccess: () => void;
  switchToLogin: () => void;
  switchToHome: () => void;
}