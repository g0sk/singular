import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

import {TagInfo, TagResponse} from 'types';

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

export async function cancelRequest() {
  await NfcManager.cancelTechnologyRequest();
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
  } catch (e) {
    throw e;
  } finally {
    NfcManager.cancelTechnologyRequest();
    return success;
  }
}

export async function readNdefTag(): Promise<TagInfo | null> {
  let tagFormatted: TagInfo = null;
  try {
    //define intent so android doesnt read it default
    await NfcManager.start();
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag: TagResponse = await NfcManager.getTag();
    if (tag !== null) {
      if (
        tag.ndefMessage[0].payload.length > 0 ||
        tag.ndefMessage[1].payload.length > 0
      ) {
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
      } else {
        console.error('NDEF message empty');
        console.error('Read operation stopped');
      }
    } else {
      console.error('TAG EMPTY');
    }
  } catch (e) {
    throw e;
  } finally {
    NfcManager.cancelTechnologyRequest();
    return tagFormatted;
  }
}
