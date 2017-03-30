import { prop, path, curry, map, concat } from 'ramda';
import { Maybe } from 'ramda-fantasy';

const DEFAULT_LANGUAGE = 'uk';
const CURRENT_HOST = window.location.origin + '/F1';

const pages = map(concat(CURRENT_HOST), {
   uk: '/pages/ukrainian.html',
   ru: '/pages/russian.html',
   en: '/pages/english.html',
});

const iUser = {
   firstName: 'Roman',
   lastName: 'Valihura',
   prefs: {
      language: 'en',
   },
};

const redirectTo = (url) => { window.location = url };

const getURLForUser = (user) => {
   return Maybe(user)
      .map(path(['prefs', 'language']))
      .chain(maybeGetUrl(pages));
}

const maybeGetUrl = curry((pages, language) => Maybe(pages[language]));

const boot = (user, defaultURL) => {
   const indexUrl = getURLForUser(user).getOrElse(defaultURL);
   redirectTo(indexUrl);
}

boot(iUser, pages[DEFAULT_LANGUAGE]);