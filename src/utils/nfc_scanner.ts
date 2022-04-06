import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

import {TagInfo} from 'types';
import {TagResponse} from '../../types';

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

//writes ndef message on tag. First Ndef array position is for the activeID.
//Second Ndef array position is for activeType
export async function writeNdefTextRecord(
  id: string,
  activeType: string,
): Promise<boolean> {
  let success: boolean = false;
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const bytes = Ndef.encodeMessage([
      Ndef.textRecord(id),
      Ndef.textRecord(activeType),
    ]);
    if (bytes.length > 0) {
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      success = true;
    }
  } catch (e: any) {
    console.warn(e);
  } finally {
    NfcManager.cancelTechnologyRequest();
    return success;
  }
}

export async function readNdefTag(): Promise<TagInfo> {
  let tagFormatted = {} as TagInfo;
  try {
    console.warn('Requesting NDEF technology');
    await NfcManager.requestTechnology(NfcTech.Ndef);
    console.log('NDEF technology available');
    console.log('Scanning for tag');
    const tag: TagResponse = await NfcManager.getTag();
    if (tag !== null) {
      console.log('Tag found');
      if (
        tag.ndefMessage[0].payload.length === 0 ||
        tag.ndefMessage[1].payload.length === 0
      ) {
        tagFormatted = null;
        console.error('NDEF message empty');
      } else {
        tagFormatted = {
          tag: tag,
          activeInfo: {
            reference: Ndef.text.decodePayload(
              Uint8Array.from(tag.ndefMessage[0].payload),
            ),
            type: Ndef.text.decodePayload(
              Uint8Array.from(tag.ndefMessage[1].payload),
            ),
          },
        };
      }
    }
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    console.log('Tag reading ended');
    NfcManager.cancelTechnologyRequest();
    return tagFormatted;
  }
}
