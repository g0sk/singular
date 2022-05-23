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
  console.log('Scan aborted');
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
  } catch (e: any) {
    console.warn(e);
  } finally {
    NfcManager.cancelTechnologyRequest();
    return success;
  }
}

export async function readNdefTag(): Promise<TagInfo | null> {
  let tagFormatted: TagInfo = null;
  try {
    //define intent so android doesnt read it default
    console.log('Starting NFC MANAGER');
    await NfcManager.start();

    console.log('Requesting NDEF technology');
    await NfcManager.requestTechnology(NfcTech.Ndef);

    console.log('Scanning tag');
    const tag: TagResponse = await NfcManager.getTag();

    if (tag !== null) {
      console.log('Raw tag data: ', tag);
      if (
        tag.ndefMessage[0].payload.length === 0 ||
        tag.ndefMessage[1].payload.length === 0
      ) {
        console.error('NDEF message empty');
        console.error('Cancelling');
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
        console.log('Formatted tag data: ', tagFormatted);
      }
    } else {
      console.error('TAG EMPTY');
    }
  } catch (e) {
    throw e;
  } finally {
    console.log('Tag reading ended');
    NfcManager.cancelTechnologyRequest();
    return tagFormatted;
  }
}
