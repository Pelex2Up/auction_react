export interface IProfile {
  id: number;
  profile: {
    id: number;
    type: string;
    avatar: string;
    name: string;
    unp: string;
    phone_number: string;
  };
  last_login: string;
  date_joined: string;
  email: string;
  username: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_verified: boolean;
  is_active: boolean;
  is_blocked: boolean;
  groups: [];
  user_permissions: [];
}
