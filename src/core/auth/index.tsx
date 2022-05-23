/// Auth.tsx
import * as React from 'react';
import store from 'store/configureStore';
import {fetchUser} from 'store/slices/user/userAsyncThunk';
import {User} from 'types';
import {logOut, fetchToken} from './authSlice';
import {getCredentials, removeCredentials} from '../storage';

interface AuthState {
  userToken: string | undefined | null;
  refreshToken: string | undefined | null;
  status: 'idle' | 'signOut' | 'signIn';
  user: User | null;
}
type AuthAction =
  | {type: 'SIGN_IN'; token: string; refreshToken: string; user: User}
  | {type: 'SIGN_OUT'};

type AuthPayload = {token: string; refreshToken: string; user: User};

interface AuthContextActions {
  signIn: (data: AuthPayload) => void;
  signOut: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}
const AuthContext = React.createContext<AuthContextType>({
  status: 'idle',
  userToken: null,
  refreshToken: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

// In case you want to use Auth functions outside React tree
export const AuthRef = React.createRef<AuthContextActions>();

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }
  return context;
};

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = React.useReducer(AuthReducer, {
    status: 'idle',
    userToken: null,
    refreshToken: null,
    user: null,
  });

  React.useEffect(() => {
    const initState = async () => {
      try {
        const credentials = await getCredentials();
        if (credentials !== null) {
          store
            .dispatch(
              fetchToken({
                username: credentials.username,
                password: credentials.password,
              }),
            )
            .then(() => {
              const {token, refreshToken, userID} = store.getState().auth;
              if (token !== null && refreshToken !== null && userID !== null) {
                store.dispatch(fetchUser(userID)).then(() => {
                  const {user} = store.getState().user;
                  if (user !== null) {
                    dispatch({type: 'SIGN_IN', token, refreshToken, user});
                  } else {
                    console.log('AuthProvider could not fetch user info');
                    dispatch({type: 'SIGN_OUT'});
                  }
                });
              } else {
                console.log('AuthProvider could not fetch authentication info');
                dispatch({type: 'SIGN_OUT'});
              }
            });
        } else {
          console.log("AuthProvider couldn't find credentials on device");
          dispatch({type: 'SIGN_OUT'});
        }
      } catch (e) {
        throw e;
      }
    };

    initState();
  }, []);

  React.useImperativeHandle(AuthRef, () => authActions);

  const authActions: AuthContextActions = React.useMemo(
    () => ({
      signIn: async ({token, refreshToken, user}: AuthPayload) => {
        dispatch({type: 'SIGN_IN', token, refreshToken, user});
      },
      signOut: async () => {
        //Reset store
        store.dispatch(logOut());
        dispatch({type: 'SIGN_OUT'});
        try {
          await removeCredentials();
        } catch (e) {
          console.log("Couldn't remove credentials from device");
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...state, ...authActions}}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        status: 'signIn',
        userToken: action.token,
        refreshToken: action.refreshToken,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        status: 'signOut',
        userToken: null,
        refreshToken: null,
        user: null,
      };
  }
};
