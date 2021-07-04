import {I18nManager} from 'react-native';
import i18n from 'i18n-js';
import {memoize} from 'lodash';
import * as RNLocalize from 'react-native-localize';

const translations: {[key: string]: () => any} = {
  es: () => require('lang/es.json'),
  en: () => require('lang/en.json'),
};

type MemoizeResolver<F extends (...args: any) => any> = (
  ...args: Parameters<F>
) => string;

const resolver: MemoizeResolver<typeof i18n.t> = (scope, options) =>
  JSON.stringify({scope, options});

export const translate = memoize<typeof i18n.t>(i18n.t, resolver);

export const setI18nConfig = () => {
  const fallback = {languageTag: 'es', isRTL: false};
  //RNLocalize priorizes the languages ordered by the user on the device settings
  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback;

  translate.cache.clear?.();
  I18nManager.forceRTL(isRTL);

  i18n.translations = {[languageTag]: translations[languageTag]()};
  i18n.locale = languageTag;
};
