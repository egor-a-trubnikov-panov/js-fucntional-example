const DEFAULT_LANGUAGE = 'uk';
const CURRENT_HOST = window.location.origin + '/F1';

let pages = {
   uk: '/pages/ukrainian.html',
   ru: '/pages/russian.html',
   en: '/pages/english.html',
};

for (let lang in pages) {
   pages[lang] = CURRENT_HOST + pages[lang];
}

const iUser = {
   firstName: 'Roman',
   lastName: 'Valihura',
   prefs: {
      language: 'uk',
   },
};

const redirectTo = (url) => { window.location = url };

const getUrlForUser = (user) => {
   const defaultUrl = pages[DEFAULT_LANGUAGE];

   if (user == null) {
      return defaultUrl;
   }
   if (user.prefs.language && user.prefs.language != 'undefined') {
      if (pages[user.prefs.language]) {
         return pages[user.prefs.language];
      } else {
         return defaultUrl;
      }
   }
}

redirectTo(getUrlForUser(iUser));
