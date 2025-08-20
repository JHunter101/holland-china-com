import { writable, type Writable } from 'svelte/store';
import type { LangData, Locale } from './models/commonTypes';
import { browser } from '$app/environment'; // SvelteKit helper

const STORAGE_KEY = 'preferredLang';

function getInitialLang(): Locale {
    if (browser) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored as Locale;
    }
    return 'EN';
}

export const currentLang: Writable<Locale> = writable(getInitialLang());
export const langData: Writable<LangData> = writable({});

export async function loadLang(langCode: Locale): Promise<void> {
    currentLang.set(langCode);

    if (browser) {
        localStorage.setItem(STORAGE_KEY, langCode);
    }

    try {
        const res = await fetch(`/locales/${langCode.toLowerCase()}.json`);
        if (!res.ok) throw new Error(`Failed to fetch /locales/${langCode.toLowerCase()}.json`);
        const data: LangData = await res.json();
        langData.set(data);
    } catch (err) {
        console.error('Failed to load language:', langCode, err);
    }
}

export const loadEN = () => loadLang('EN');
export const loadNL = () => loadLang('NL');
export const loadCN = () => loadLang('CN');
