import * as React from 'react';
import nfcManager from 'react-native-nfc-manager';

interface NfcState {
  supported: boolean;
  enabled: boolean;
}
type NfcAction =
  | {type: 'CHECK_NFC_SUPPORTED'; supported: boolean}
  | {type: 'CHECK_NFC_ENABLED'; enabled: boolean};

interface NfcContextActions {
  checkNfcSupported: () => void;
  checkNfcEnabled: () => void;
}

interface NfcContextType extends NfcState, NfcContextActions {}
const NfcContext = React.createContext<NfcContextType>({
  supported: false,
  enabled: false,
  checkNfcSupported: () => false,
  checkNfcEnabled: () => false,
});

export const NfcRef = React.createRef<NfcContextActions>();

export const useNfc = (): NfcContextType => {
  const context = React.useContext(NfcContext);
  if (!context) {
    throw new Error('useNfc must be inside an AuthProvider with a value');
  }
  return context;
};

export const NfcProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = React.useReducer(NfcReducer, {
    supported: false,
    enabled: false,
  });

  React.useEffect(() => {
    const initState = async () => {
      try {
        const isSupported = await nfcManager.isSupported();
        dispatch({type: 'CHECK_NFC_SUPPORTED', supported: isSupported});
        if (isSupported) {
          const isEnabled = await nfcManager.isEnabled();
          dispatch({type: 'CHECK_NFC_ENABLED', enabled: isEnabled});
        }
      } catch (e) {
        //console.warn('Error while checking Nfc support/enabled');
      }
    };
    initState();
  }, []);

  React.useImperativeHandle(NfcRef, () => nfcActions);

  const nfcActions: NfcContextActions = React.useMemo(
    () => ({
      checkNfcSupported: async () => {
        const _supported = await nfcManager.isSupported();
        dispatch({type: 'CHECK_NFC_SUPPORTED', supported: _supported});
      },
      checkNfcEnabled: async () => {
        const _enabled = await nfcManager.isEnabled();
        dispatch({type: 'CHECK_NFC_ENABLED', enabled: _enabled});
      },
    }),
    [],
  );

  return (
    <NfcContext.Provider value={{...state, ...nfcActions}}>
      {children}
    </NfcContext.Provider>
  );
};

const NfcReducer = (prevState: NfcState, action: NfcAction): NfcState => {
  switch (action.type) {
    case 'CHECK_NFC_SUPPORTED':
      return {
        ...prevState,
        supported: action.supported,
      };
    case 'CHECK_NFC_ENABLED':
      return {
        ...prevState,
        enabled: action.enabled,
      };
  }
};
