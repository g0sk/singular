import {Dispatch, SetStateAction} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
};

export type ActiveError = {
  property: string;
  message: string;
};

export type ViolationsErrors = {
  message: string;
  propertyPath: string;
};

export type ServerError = {
  detail: string;
  title: string;
  type: string;
  violations: ViolationsErrors[];
};

//Auth Navigator
export type AuthParamList = {
  Login: undefined;
};

export type Segment = 'active' | 'activeType';

export type TagData = {
  reference: string;
  type: string;
};

//Navigators params

export type RootDocumentParamList = {
  ActiveList: {};
  ActiveDetails: {
    activeId: number;
    recordId: number;
    title: string;
  };
  NewActive: {
    title: string;
  };
  RecordList: {
    recordId: number;
    activeId: number;
    title: string;
  };
  RecordDetails: {
    recordActive: RecordActive;
    title: string;
  };
  RecordStats: {
    recordId: number;
  };
};

export type RootActiveTypeParamList = {
  ActiveTypeList: {};
  ActiveTypeDetails: {
    typeId: number;
    title: string;
  };
  NewActiveType: {
    title: string;
  };
};

export type RootScanNavigatorParamList = {
  ScanHome: {};
  ScanTagSuccess: {
    tag: TagInfo;
    title: string;
  };
  ScanActiveSuccess: {
    active: Active;
    title: string;
  };
  NewTag: {
    title: string;
    tag: TagData;
  };
};

export type RootWriteNavigatorParamList = {
  WriteHome: {};
  WriteForm: {
    title: string;
  };
  WriteSuccess: {
    reference: string;
    title: string;
    type: string;
  };
};

export type RootNavigatorParamList = {
  Auth: AuthParamList;
  Drawer: DrawerNavigatorParamList;
};

export type TagErrorNavigatorParamList = {
  NfcNotSupported: undefined;
  NfcNotEnabled: undefined;
};

export type TagNavigatorParamList = {
  TagTab: TagTabNavigatorParamList;
  TagError: TagErrorNavigatorParamList;
};

export type TagTabNavigatorParamList = {
  Scan: RootScanNavigatorParamList;
  Write: RootWriteNavigatorParamList;
};

//TabNavigator
export type DocumentTabNavigatorParamList = {
  DocumentNavigator: RootDocumentParamList;
  ActiveTypeNavigator: RootActiveTypeParamList;
};

//Navigators navigation/route params

export type AppNavigatorParamList = {
  Drawer: DrawerNavigatorParamList;
};

export type DrawerStackNavigationProp = DrawerNavigationProp<
  AppNavigatorParamList,
  'Drawer'
>;

export type DrawerStackProps = {
  navigation: DrawerStackNavigationProp;
};

export type DrawerNavigatorParamList = {
  Home: DocumentTabNavigatorParamList;
  Tag: TagNavigatorParamList;
  Profile: undefined;
};

//DocumentList items
export type ActiveItemFormProps = {
  active: Active;
  navigation: ActiveListNavigationProp;
};

export type TypeItemFormProps = {
  type: ActiveType;
  navigation: ActiveTypeListNavigationProp;
  route: ActiveTypeListRouteProp;
};

//Document navigator types

//Documents screen
export type ActiveListRouteProp = RouteProp<
  RootDocumentParamList,
  'ActiveList'
>;
export type ActiveListNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'ActiveList'
>;
export type ActiveListScreenProps = {
  route: ActiveListRouteProp;
  navigation: ActiveListNavigationProp;
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
export type NewTagRouteProp = RouteProp<RootScanNavigatorParamList, 'NewTag'>;
export type NewTagNavigationProp = StackNavigationProp<
  RootScanNavigatorParamList,
  'NewTag'
>;
export type NewTagScreenProps = {
  route: NewTagRouteProp;
  navigation: NewTagNavigationProp;
};

//Type Details Screen
export type ActiveTypeListRouteProp = RouteProp<
  RootActiveTypeParamList,
  'ActiveTypeDetails'
>;
export type ActiveTypeListNavigationProp = StackNavigationProp<
  RootActiveTypeParamList,
  'ActiveTypeDetails'
>;
export type ActiveTypeListsScreenProps = {
  route: ActiveTypeListRouteProp;
  navigation: ActiveTypeListNavigationProp;
};

export type ActiveTypeDetailsRouteProp = RouteProp<
  RootActiveTypeParamList,
  'ActiveTypeDetails'
>;
export type ActiveTypeDetailsNavigationProp = StackNavigationProp<
  RootActiveTypeParamList,
  'ActiveTypeDetails'
>;
export type ActiveTypeDetailsScreenProps = {
  route: ActiveTypeDetailsRouteProp;
  navigation: ActiveTypeDetailsNavigationProp;
};

//New ActiveType screen
export type NewActiveTypeRouteProp = RouteProp<
  RootActiveTypeParamList,
  'NewActiveType'
>;
export type NewActiveTypeNavigationProp = StackNavigationProp<
  RootActiveTypeParamList,
  'ActiveTypeDetails'
>;
export type NewActiveTypeScreenProps = {
  route: NewActiveTypeRouteProp;
  navigation: NewActiveTypeNavigationProp;
};

//Record List
export type RecordListNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'RecordList'
>;

export type RecordListRouteProp = RouteProp<
  RootDocumentParamList,
  'RecordList'
>;

export interface RecordListProps {
  activeId: number;
  route: RecordListRouteProp;
  navigation: RecordListNavigationProp;
}

//Record details
export type RecordDetailsRouteProp = RouteProp<
  RootDocumentParamList,
  'RecordDetails'
>;
export type RecordDetailsNavigationProp = StackNavigationProp<
  RootDocumentParamList,
  'RecordDetails'
>;
export type RecordDetailsStackProps = {
  route: RecordDetailsRouteProp;
  navigation: RecordDetailsNavigationProp;
};

//Scan

export type ScanHomeNavigationProp = NativeStackNavigationProp<
  RootScanNavigatorParamList,
  'ScanHome'
>;
export type ScanHomeRouteProp = RouteProp<
  RootScanNavigatorParamList,
  'ScanHome'
>;

export type ScanHomeScreenProps = {
  navigation: ScanHomeNavigationProp;
  route: ScanHomeRouteProp;
};

export type ScanActiveSuccessNavigationProp = NativeStackNavigationProp<
  RootScanNavigatorParamList,
  'ScanActiveSuccess'
>;

export type ScanActiveSuccessRouteProp = RouteProp<
  RootScanNavigatorParamList,
  'ScanActiveSuccess'
>;

export type ScanActiveSuccessScreenProps = {
  navigation: ScanActiveSuccessNavigationProp;
  route: ScanActiveSuccessRouteProp;
};

export type ScanTagSuccessNavigationProp = NativeStackNavigationProp<
  RootScanNavigatorParamList,
  'ScanTagSuccess'
>;

export type ScanTagSuccessRouteProp = RouteProp<
  RootScanNavigatorParamList,
  'ScanTagSuccess'
>;

export type ScanTagSuccessScreenProps = {
  navigation: ScanTagSuccessNavigationProp;
  route: ScanTagSuccessRouteProp;
};

export type ScanNewTagNavigationProp = NativeStackNavigationProp<
  RootScanNavigatorParamList,
  'NewTag'
>;

export type ScanNewTagRouteProp = RouteProp<
  RootScanNavigatorParamList,
  'NewTag'
>;

export type ScanNewTagScreenProps = {
  navigation: ScanNewTagNavigationProp;
  route: ScanNewTagNavigationProp;
};

//Write

export type WriteHomeNavigationProp = NativeStackNavigationProp<
  RootWriteNavigatorParamList,
  'WriteHome'
>;

export type WriteHomeRouteProp = RouteProp<
  RootWriteNavigatorParamList,
  'WriteHome'
>;

export type WriteHomeScreenProps = {
  navigation: WriteHomeNavigationProp;
  route: WriteHomeRouteProp;
};

export type WriteFormNavigationProp = NativeStackNavigationProp<
  RootWriteNavigatorParamList,
  'WriteForm'
>;

export type WriteFormRouteProp = RouteProp<
  RootWriteNavigatorParamList,
  'WriteForm'
>;

export type WriteFormScreenProps = {
  navigation: WriteFormNavigationProp;
  route: WriteFormRouteProp;
};

export type WriteSuccessNavigationProp = NativeStackNavigationProp<
  RootWriteNavigatorParamList,
  'WriteSuccess'
>;

export type WriteSuccessRouteProp = RouteProp<
  RootWriteNavigatorParamList,
  'WriteSuccess'
>;

export type WriteSuccessScreenProps = {
  navigation: WriteSuccessNavigationProp;
  route: WriteSuccessRouteProp;
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
  groups?: string[];
  image: File | null;
}

//Used only on recordListItem
export interface UserInfo {
  id: number;
  username: string;
  name: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  groups?: string[];
  image: string;
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

export type AttributeType = 'basic' | 'custom';

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
  activesCount?: number;
  basicAttributes: Attribute[];
  customAttributes: Attribute[];
}

export interface NewActiveTypeProps {
  name: string;
  basicAttributes: NewAttribute[];
  customAttributes: NewAttribute[];
}

export interface ActiveTypesResponse {
  types: ActiveType[];
  page: number;
  count: number;
  itemsPerPage: number;
}

export interface ActiveTypeState {
  nextPage: number;
  itemsPerPage: number;
  filtered: boolean;
  activeTypesLength: number;
  activeTypesList: ActiveType[];
  activeType: ActiveType | null;
  activeTypes: ActiveType[];
  loading: boolean;
  error: boolean;
}

export type ActiveTypes = ActiveType[];

export type SearchFilter = {
  key: string;
  name: string;
  color: string;
  icon: string;
};

export type PaginationFilters = {
  pagination: Pagination;
  filters: Filters;
};

export type Pagination = {
  page: number;
  itemsPerPage?: number;
};

export type Filter = {
  key: string;
  value: string;
};

export type Filters = Filter[];

//Actives Response
export interface ActivesResponse {
  actives: Active[];
  page: number;
  itemsPerPage: number;
  count: number;
}

//Active
export interface Active {
  id: number;
  reference: string;
  entryDate: string;
  createdBy: User;
  updatedBy: User;
  updatedAt: string;
  createdAt: string;
  description: string;
  activeRecord: {
    id: number;
  };
  file: File | null;
  activeType: ActiveType;
  basicAttributes: Attribute[];
  customAttributes: Attribute[];
}

export interface NewActiveProps {
  reference: string;
  description: string;
  file: File | null;
  activeType: ActiveType | null;
  basicAttributes: NewAttribute[];
  customAttributes: NewAttribute[];
}

export type Actives = Array<Active>;

export interface ActiveState {
  active: Active | null;
  actives: Actives;
  activesLength: number;
  filtered: boolean;
  itemsPerPage: number;
  nextPage: number;
  loading: boolean;
  error: boolean;
  errorData: ServerError | null;
}

//Tag
export interface TagState {
  lastTag: TagInfo;
  time: Date | null;
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
export interface UserFormValues {
  name: string;
  lastName: string;
  username: string;
}

//Scan Screen

export type OperationMode = 'read' | 'write';

export interface ScanErrorProps {
  error: OperationMode;
}

export type TagInfo = {
  tag: TagResponse;
  activeInfo: ActiveInfo;
} | null;

export type TagResponse = TagEvent | null;

export type ActiveInfo = {
  reference: string;
  type: string;
};

export interface ScanSuccessProps {
  tag?: TagInfo;
}

//Components

export type Mode = 'active' | 'activeType';
export type SegmentLabel<T> = {
  name: string;
  id: T;
};
export interface SegmentProps<T> {
  labels: SegmentLabel<T>[];
  segmentHandler: Dispatch<SetStateAction<T>>;
  mode: T;
}

export interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

export interface Item {
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
  active: Active;
  dateRecord: Array<string>;
  activeObject: Array<RecordActive>;
  createdBy: User;
  updatedBy: UserInfo;
  updatedAt: string;
  createdAt: string;
}

export interface RecordListItemProps {
  recordActive: RecordActive;
  navigation: RecordListNavigationProp;
  route: RecordListRouteProp;
}

export interface RecordActive {
  entry_date: string;
  reference: string;
  file: File | null;
  type: {
    id: number;
    name: string;
  };
  description: string;
  user: User;
  basic_attributes: Attribute[];
  custom_attributes: Attribute[];
  createdBy: User;
  updatedBy: UserInfo;
  createdAt: string;
  updatedAt: {
    date: string;
    timezone: string;
    timezone_type: string;
  };
}

export interface RecordModalProps {
  activeRecord: Record | null;
  route: ActiveDetailsRouteProp;
  navigation: ActiveDetailsNavigationProp;
}

export interface RecordState {
  activeRecord: Record | null;
  filteredRecords: RecordActive[];
  dateRecords: string[];
  recordsLength: number;
  loading: boolean;
  error: boolean;
}

//Section
export interface SectionProps {
  collection: Attribute[];
  label: string;
  open?: boolean;
}

//Dynamic form
export interface DynamicSectionProps {
  collection: Attribute[];
  label: string;
  emptyMessage?: string;
  editDropdownValue: boolean;
  editValue: boolean;
  canAddItems: boolean;
  setChanges: (items: Attribute[]) => void;
  open?: boolean;
}

//Dynamic Fields
export interface DynamicFieldsProps {
  editDropdownValue: boolean;
  editValue: boolean;
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
  editSelected: boolean;
  setParentValue: (_item: T) => void;
  header: string;
  placeholder: string;
  isRecord?: boolean;
}

//DatePicker

export interface DatePickerProps {
  open: boolean;
  entryDate: Date;
  maximumDate?: Date;
  minimumDate?: Date;
  setParentDate: (_date: Date) => void;
  onCancel: () => void;
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
  label: string;
  labelAction?: () => void;
  defaultIcon?: string;
  hasExtraIcon?: boolean;
  extraIcon?: string;
  defaultAction?: () => void;
  extraAction?: () => void;
  segment: Mode;
}

//Simple header
export interface SimpleHeaderProps {
  label: string;
  labelAction?: () => void;
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

export type ImageUploadProps = {
  file: File | null;
  saveImage: (file: File | null) => void;
};
