// better-auth configuration for user authentication

export const authConfig = {
  provider: 'better-auth',
  routes: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  features: {
    passwordRecovery: true,
    emailVerification: true,
    twoFactorAuth: true,
  },
};