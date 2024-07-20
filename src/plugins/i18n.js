import { createI18n } from 'vue-i18n';
import portuguese from '../locales/pt-br.json'
import english from '../locales/en.json'

const messages = {
    en: english,
    pt: portuguese
};

const i18n = createI18n({
    locale: 'pt',
    globalInjection: true,
    fallbackLocale: 'en',
    messages,
});

export default i18n;