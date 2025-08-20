import { loadLocale } from "../locale/loadLocale";

document.addEventListener('DOMContentLoaded', function () {
    const userLang = navigator.language.slice(0, 2) || 'en';
    loadLocale(userLang);
});
