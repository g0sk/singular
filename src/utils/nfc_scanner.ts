import NfcManager, {NfcEvents, TagEvent} from 'react-native-nfc-manager';

type TagResponse = TagEvent | null;

const loadingDots: string =
  '.........................................................................................';

export async function isSupported() {
  return await NfcManager.isSupported();
}

export async function isEnabled() {
  return await NfcManager.isEnabled();
}

//Start nfc manager before using it
export async function initNfc() {
  await NfcManager.start();
}

//reads ndef_message its ndef_records
export function readNdef(): Promise<TagResponse> {
  console.log('Start readNdef');
  console.log(loadingDots);
  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    console.log('Clean up events');
  };

  return new Promise((resolve, reject) => {
    let tagFound: TagResponse = null;

    console.log('Discovering tags');
    console.log(loadingDots);
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (evt: TagEvent) => {
      if (evt !== null) {
        tagFound = evt;
        resolve(tagFound);
        NfcManager.setAlertMessage('TAG FOUND');
        console.log('TAG FOUND', tagFound);
        NfcManager.unregisterTagEvent().catch(() => 0);
      }
      console.log('TAG NOT FOUND');
      reject(null);
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      console.log('SESSION CLOSED');
      console.log(loadingDots);
      cleanUp();
      if (!tagFound) {
        console.log("TimeOut: Couldn't find any tag");
        resolve(null);
      }
    });
    NfcManager.registerTagEvent();
  });
}
