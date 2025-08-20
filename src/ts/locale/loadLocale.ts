async function loadTranslations(path: string, container: HTMLElement | Document = document) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Locale file not found');

        const translations = await response.json();

        container.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = key?.split('.').reduce((obj, k) => obj && obj[k], translations);

            if (value) {
                el.textContent = value;
            }
        });
    } catch (error) {
        console.error('Error loading locale:', error);
    }
}

export function loadLocale(locale: string) {
    return loadTranslations(`/locales/${locale}.json`, document);
}

export function loadLocalePosts(locale: string, container: HTMLElement) {
    return loadTranslations(`/locales/posts/${locale}.json`, container);
}
