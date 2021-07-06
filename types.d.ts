import {Dispatch, SetStateAction} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Image} from 'react-native';
import {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
} from '@shopify/restyle';
import {Theme} from 'ui/Theme';
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
export type AppNavigatorParamList = {
  Tab: TabNavigatorParamList;
};
export type TabRouteProp = StackNavigationProp<AppNavigatorParamList, 'Tab'>;

export type TabNavigationProp = StackNavigationProp<
  AppNavigatorParamList,
  'Tab'
>;

export type TabStackProps = {
  navigation: TabNavigationProp;
  route: TabRouteProp;
};

//TabNavigator
export type TabNavigatorParamList = {
  Home: undefined;
  Scan: undefined;
  DocumentNavigator: RootDocumentParamList;
  Profile: undefined;
};

//Auth Navigator
export type AuthParamList = {
  Login: undefined;
};

//Routes Document
export type RootDocumentParamList = {
  Documents: undefined;
  Document: {activeId: number | undefined; title: string | undefined};
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

//Login
export interface FormValues {
  username: string;
  password: string;
  saveCredentials: boolean;
}

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
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  image: {
    id: number;
    contentUrl: string;
  } | null;
}

//Updated user
export interface UpdateUser {
  username: string;
  name: string;
  lastName: string;
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

//Media object

export type MediaObjectResponse = {
  id: number;
  contentUrl: string;
};

export interface MediaObjectState {
  image: MediaObjectResponse | null;
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

//Profile Scren
interface UserFormValues {
  name: string;
  lastName: string;
  username: string;
}

//Scan Screen
interface ScanErrorProps {
  supported: boolean;
  enabled: boolean;
  retry: () => void;
}

interface ScanProps {
  reading: boolean;
}
interface ScanSuccessProps {}

//Components

//Button
export type ButtonProps = SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label?: string;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
  };

//Header
export interface HeaderProps {
  disabled: boolean;
  label: string;
  labelAction?: () => void;
  defaultIcon?: string;
  hasExtraIcon?: boolean;
  extraIcon?: string;
  defaultAction?: () => void;
  extraAction?: () => void;
}

//Avatar
export interface AvatarProps {
  hasBorder?: boolean;
  placeholderImg?: Image;
  uri?: string | undefined;
  isContentUrl?: boolean;
  height?: number;
  width?: number;
  longPress: () => void;
  press: () => void;
}

//Image Picker
export interface PermissionTypes {
  camera: boolean;
  storage: boolean;
}

export type ParsedImage =
  | {
      //base64: string | undefined;
      type: string | undefined;
      uri: string | undefined;
      width: number | undefined;
      height: number | undefined;
      fileSize: number | undefined;
      fileName: string | undefined;
    }
  | undefined;

export type ImagePickerProps = {
  visible: boolean;
  setModalVisibility: Dispatch<SetStateAction<boolean>>;
  //saveImage: Dispatch<SetStateAction<ParsedImage | undefined>>;
  saveImage: (image: ParsedImage) => void;
  cameraType?: 'back' | 'front';
};
