import {Dispatch, SetStateAction} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Image} from 'react-native';
import {TagEvent} from 'react-native-nfc-manager';
import {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
} from '@shopify/restyle';
import {Theme} from 'ui/Theme';
import {AnyObjectSchema} from 'yup';

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
  Document: {
    active: Active | null;
    title: string;
    tag?: TagEvent;
  };
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

//Atributes
export interface Attribute {
  id: number;
  name: string;
  value: string;
}

//Active Types
export interface ActiveType {
  id: number;
  name: string;
  basicAttributes: Attribute[];
  customAttributes: Attribute[];
}

export type ActiveTypes = ActiveType[];

//Active
export interface Active {
  id: number;
  reference: string;
  entryDate: string;
  activeRecord: {
    id: number;
  } | null;
  file: File;
  activeType: ActiveType;
  attributeValues?: Attribute[];
}

export interface NewActive {
  reference: string;
  entryDate: Date;
  file: File | null;
  activeType: ActiveType | null;
  attributeValues: Attribute[];
}

export type Actives = Array<Active>;

export interface ActiveState {
  active: Active | null;
  actives: Actives | null;
  activesLength: number;
  activeTypes: ActiveType[];
  page: number;
  loading: boolean;
  error: boolean;
  errorData: Error;
}

//Media object

export type MediaObjectPayload = {
  id: number;
  contentUrl: string;
};

export interface MediaObjectState {
  image: MediaObjectPayload | null;
  loading: boolean;
  error: boolean;
  errorData: Error;
}

//DocumentList types
export interface ItemType {
  id: number;
  name: string;
}

export interface DocumentFormProps {
  active: Active | null;
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
}

interface ScanProps {
  reading: boolean;
}
interface ScanSuccessProps {
  tag: TagEvent;
}

//Components
export interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

interface Item {
  id: string;
  name: string;
}

//Record
export interface Record {
  id: number;
  active: {
    id: number;
    reference: string;
  };
  dateRecord: Array<string>;
  activeObject: Array<Active>;
}

export interface RecordState {
  activeRecord: Record;
  loading: boolean;
  error: boolean;
}

export interface RecordProps {
  activeRecord: Record;
}

//Dynamic form
export interface DynamicFormProps<T> {
  basicAttributes: T[];
  customAttributes: T[];
}

//Form
export interface FormProps<T> {
  item: T;
  schema?: AnyObjectSchema;
  setChange?: Dispatch<SetStateAction<T>>;
}
export interface FormItem extends ActiveType {}

export type ItemGeneric = {
  id: number;
  name: string;
};

//Dropdown
export interface DropdownProps<T> {
  selected?: T;
  options: T[];
  setParentValue: Dispatch<SetStateAction<T>>;
  header: string;
  placeholder: string;
  emptyMessage: string;
}

//DatePicker

export interface DatePickerProps {
  entryDate: Date | string;
  setParentDate: Dispatch<SetStateAction<Date>>;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
  showCalendar: boolean;
}

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
  uri?: string;
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

export type ParsedImage = {
  base64: string | undefined;
  type: string | undefined;
  uri: string | undefined;
  width: number | undefined;
  height: number | undefined;
  fileSize: number | undefined;
  fileName: string | undefined;
};

export type ImagePickerProps = {
  visible: boolean;
  setModalVisibility: Dispatch<SetStateAction<boolean>>;
  //saveImage: Dispatch<SetStateAction<ParsedImage | undefined>>;
  saveImage: (image: ParsedImage) => void;
  cameraType?: 'back' | 'front';
};
