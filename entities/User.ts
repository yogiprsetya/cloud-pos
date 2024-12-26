export type Role = 'manager' | 'cashier' | 'trainee';

export type AppUser = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: Role;
};

export type AppJWT = AppUser & {
  sub: string;
  iat: number;
  exp: number;
  jti: string;
};
