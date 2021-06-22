//Geral types
export type Credentials = {
  username: string;
  password: string;
};

export type File = {
  id: number;
  contentUrl: string;
};

export type Error = ErrorData | null;

export type ErrorData = {
  code: number;
  message: string;
} | null;

//Auth Types
export type AuthState = {
  userID: number | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: boolean;
  errorData: Error;
};

export type AuthResponse = {
  token: string;
  user_data: {
    id: number;
    username: string;
  };
  refresh_token: string;
};

export type RefreshTokenResponse = {
  token: string;
  refresh_token: string;
};

//User types
interface User {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  image: {
    id: number;
    contentUrl: string;
  } | null;
}

interface UserState {
  loading: boolean;
  error: boolean;
  user: User | null;
}

//Active Types
export interface Active {
  id: number;
  reference: string;
  entryDate: string;
  measurementData: number;
  measurementUnit: string;
  estimatedLifeTime: number;
  lifetime: number;
  lifetimeMeasurementUnit: string;
  type: string;
  customAttributes: string;
  activeRecord: {};
  file: File;
}

type Actives = Array<Active>;

interface ActiveState {
  active: Active | null;
  actives: Actives | null;
  loading: boolean;
  error: boolean;
  errorData: Error;
}

//DocumentList types

interface ItemType {
  id: number;
  name: string;
}

interface DocumentListProps {
  user: User | null;
}
