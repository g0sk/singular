/// Auth.tsx
import * as React from 'react';
import store from 'store/configureStore';
import {fetchToken} from 'core/auth/authSlice';
import {fetchUser} from 'store/slices/UserSlice';
import {
  getToken,
  setToken,
  removeToken,
  removeRefreshToken,
  getUsername,
  removeUsername,
  getPassword,
  removePassword,
} from './utils';

interface AuthState {
  userToken: string | undefined | null;
  status: 'idle' | 'signOut' | 'signIn';
}
type AuthAction = {type: 'SIGN_IN'; token: string} | {type: 'SIGN_OUT'};

type AuthPayload = string;

interface AuthContextActions {
  signIn: (data: AuthPayload) => void;
  signOut: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}
const AuthContext = React.createContext<AuthContextType>({
  status: 'idle',
  userToken: null,
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
  });

  React.useEffect(() => {
    const initState = async () => {
      try {
        const userToken = await getToken();
        const username = await getUsername();
        const password = await getPassword();

        if (userToken === null) {
          if (username !== null && password !== null) {
            store.dispatch(fetchToken({username, password})).then(() => {
              const authState = store.getState();
              const newToken = authState.auth.token;
              if (newToken) {
                const userID = authState.auth.userID;
                store.dispatch(fetchUser(userID));
                dispatch({type: 'SIGN_IN', token: newToken});
              }
            });
          }
          dispatch({type: 'SIGN_OUT'});
        } else {
          dispatch({type: 'SIGN_IN', token: userToken});
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
      signIn: async (token: string) => {
        dispatch({type: 'SIGN_IN', token});
        try {
          await setToken(token);
        } catch (error) {
          console.log(error);
        }
      },
      signOut: async () => {
        await removeToken();
        await removeRefreshToken();
        await removeUsername();
        await removePassword();
        dispatch({type: 'SIGN_OUT'});
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
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        status: 'signOut',
        userToken: null,
      };
  }
};
