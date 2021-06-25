import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

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

//Route
export type RootDocumentParamList = {
  Documents: undefined;
  Document: {activeId: number} | undefined;
};

export type DocumentScreenRouteProp = RouteProp<
  RootDocumentParamList,
  'Document'
>;

export type DocumentScreenNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'Document'
>;
export type DocumentStackProps = {
  route: DocumentScreenRouteProp;
  navigation: DocumentScreenNavigationProp;
};

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
export interface User {
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

export interface UserState {
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
  activeRecord: {} | null;
  file: File;
  useWearTear: number;
}

export type Actives = Array<Active>;

export interface ActiveState {
  active: Active | null;
  actives: Actives | null;
  activesLength: number;
  page: number;
  loading: boolean;
  error: boolean;
  errorData: Error;
}

//DocumentList types
export interface ItemType {
  id: number;
  name: string;
}

export interface DocumentListProps {
  user: User | null;
}

export interface DocumentListItemProps extends Active {
  onPress: () => void;
  active: Active;
}

interface DocumentItemProps extends DocumentStackProps {
  item: Active;
}
