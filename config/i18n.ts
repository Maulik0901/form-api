import {I18n} from "i18n";
import path from "path";

// const { I18n } = require('i18n');
// const path = require('path');

const i18n = new I18n({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  directory: path.join('./', 'locales')
});

export default i18n;
// module.exports = i18n;