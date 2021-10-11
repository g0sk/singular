import {Dispatch, SetStateAction} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
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
import {RouteProp} from '@react-navigation/core';

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
};

type ActiveError = {
  property: string;
  message: string;
};

type ViolationsErrors = {
  message: string;
  propertyPath: string;
};

type ServerError = {
  detail: string;
  title: string;
  type: string;
  violations: ViolationsErrors[];
};

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

type Segment = 'active' | 'activeType';
//Routes Document
export type RootDocumentParamList = {
  DocumentList: {
    tab: Segment | null;
  };
  ActiveDetails: {
    activeId: number;
    title: string;
  };
  TagDetails: {
    tag: ActiveTagEvent;
    title: string;
  };
  NewActive: {
    title: string;
  };
  NewActiveType: {
    title: string;
  };
  ActiveTypeDetails: {
    typeId: number;
    title: string;
  };
};

//Route

//DocumentList items
export type ActiveItemFormProps = {
  active: Active;
  navigation: DocumentListNavigationProp;
};

export type TypeItemFormProps = {
  type: ActiveType;
  navigation: DocumentListNavigationProp;
  route: DocumentListRouteProp;
};

//Document navigator types

//Documents screen
export type DocumentListRouteProp = RouteProp<
  RootDocumentParamList,
  'DocumentList'
>;
export type DocumentListNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'DocumentList'
>;
export type DocumentListStackProps = {
  route: DocumentListRouteProp;
  navigation: DocumentListNavigationProp;
};

//Active details screen
export type ActiveDetailsRouteProp = RouteProp<
  RootDocumentParamList,
  'ActiveDetails'
>;
export type ActiveDetailsNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'ActiveDetails'
>;
export type ActiveDetailsScreenProps = {
  route: ActiveDetailsRouteProp;
  navigation: ActiveDetailsNavigationProp;
};

//New Active screen
export type NewActiveRouteProp = RouteProp<RootDocumentParamList, 'NewActive'>;
export type NewActiveNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'ActiveDetails'
>;
export type NewActiveScreenProps = {
  route: NewActiveRouteProp;
  navigation: NewActiveNavigationProp;
};

//Tag Details Screen
export type TagDetailsRouteProp = RouteProp<
  RootDocumentParamList,
  'TagDetails'
>;
export type TagDetailsNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'TagDetails'
>;
export type TagDetailsScreenProps = {
  route: TagDetailsRouteProp;
  navigation: TagDetailsNavigationProp;
};

//Type Details Screen
export type ActiveTypeDetailsRouteProp = RouteProp<
  RootDocumentParamList,
  'ActiveTypeDetails'
>;
export type ActiveTypeDetailsNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'ActiveTypeDetails'
>;
export type ActiveTypeDetailsScreenProps = {
  route: ActiveTypeDetailsRouteProp;
  navigation: ActiveTypeDetailsNavigationProp;
};

//New ActiveType screen
export type NewActiveTypeRouteProp = RouteProp<
  RootDocumentParamList,
  'NewActiveType'
>;
export type NewActiveTypeNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'ActiveTypeDetails'
>;
export type NewActiveTypeScreenProps = {
  route: NewActiveTypeRouteProp;
  navigation: NewActiveTypeNavigationProp;
};

export interface FormLoginValues {
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
  unit: Unit;
}

type AttributeType = 'basic' | 'custom';

export interface NewAttribute {
  name: string;
  value: string;
  unit: Unit;
}

//Basic Attribute State
export interface BasicAttributeState {
  basicAttribute: Attribute | null;
  basicAttributes: Attribute[];
  loading: boolean;
  error: boolean;
}

//Custom Attribute State
export interface CustomAttributeState {
  customAttribute: Attribute | null;
  customAttributes: Attribute[];
  loading: boolean;
  error: boolean;
}

//Active Types
export interface ActiveType {
  id: number;
  name: string;
  basicAttributes: Attribute[];
  customAttributes: Attribute[];
}

export interface NewActiveType {
  name: string;
  basicAttributes: Attribute[];
  customAttributes: Attribute[];
}

export interface ActiveTypeState {
  activeTypesLength: number;
  activeType: ActiveType | null;
  activeTypes: ActiveType[];
  loading: boolean;
  error: boolean;
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
  file: File | null;
  activeType: ActiveType;
  basicAttributes: Attribute[];
  customAttributes: Attribute[];
}

export interface NewActive {
  reference: string;
  entryDate: string;
  activeRecord: {
    id: number;
  } | null;
  file: File | null;
  activeType: ActiveType | null;
  basicAttributes: Attribute[];
  customAttributes: Attribute[];
}

export type Actives = Array<Active>;

export interface ActiveState {
  active: Active | null;
  actives: Actives;
  activesLength: number;
  page: number;
  loading: boolean;
  error: boolean;
  errorData: ServerError | null;
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

//Profile Screen
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

export interface ActiveTagEvent extends TagEvent {
  tagType?: ActiveType;
  basicAttributes?: Attribute[];
  customAttributes?: Attribute[];
}

interface ScanProps {
  reading: boolean;
}
interface ScanSuccessProps {
  tag: ActiveTagEvent;
}

//Components

export type Mode = 'active' | 'activeType';
export type SegmentLabel = {
  name: string;
  id: Mode;
};
export interface SegmentProps {
  labels: SegmentLabel[];
  segmentHandler: Dispatch<SetStateAction<Mode>>;
  mode: Mode;
}

export interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

interface Item {
  id: string;
  name: string;
}

//Unit
export interface Unit {
  id: number;
  name: string;
  readOnly: boolean;
  //attributeValues: Attribute[];
  //basicAttributes: Attribute[];
  //customAttributes: Attribute[];
}

export interface UnitState {
  unit: Unit | null;
  units: Unit[];
  unitsLength: number;
  loading: boolean;
  error: boolean;
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

export interface RecordListProps {
  activeRecord: Record | null;
}

export interface RecordState {
  activeRecord: Record;
  loading: boolean;
  error: boolean;
}

//Dynamic form
export interface DynamicSectionProps {
  collection: Attribute[] | null;
  label: string;
  emptyMessage?: string;
  isEditable: boolean;
  setChanges: (items: Attribute[]) => void;
  open?: boolean;
  loading?: boolean;
}

//Dynamic Fields
export interface DynamicFieldsProps {
  field: Attribute;
  listIndex: number;
  setItemChange: (item: Attribute, listIndex: number) => void;
}

export interface DynamicNewFieldProps {
  setNewItem: (item: Attribute) => void;
}

//Form
export type DocumentFormProps = {
  active: Active | null;
};
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
  selected: T | null;
  options: T[];
  setParentValue: (_item: T) => void;
  header: string;
  placeholder: string;
}

//DatePicker

export interface DatePickerProps {
  entryDate: Date | string;
  maximumDate?: Date;
  minimumDate?: Date;
  setParentDate: (_date: Date) => void;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
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
