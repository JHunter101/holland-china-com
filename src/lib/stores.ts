import { writable, type Writable } from 'svelte/store';
import type { LangData, Locale } from './models/commonTypes';
import { browser } from '$app/environment';

const STORAGE_KEY = 'preferredLang';

export var currentLang: Writable<Locale> = writable();
export const langData: Writable<LangData> = writable({});

export async function initLang(): Promise<void> {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    await loadLang(stored ?? 'EN');
}

async function loadLang(langCode: Locale): Promise<void> {
    currentLang.set(langCode);

    if (browser) {
        localStorage.setItem(STORAGE_KEY, langCode);
    }

    try {
        const res = await fetch(`/locales/${langCode.toLowerCase()}.json`);
        if (!res.ok) throw new Error(`Failed to fetch locale: ${langCode}`);
        const data: LangData = await res.json();
        langData.set(data);
    } catch (err) {
        console.error('Failed to load language:', langCode, err);
    }
}

export const loadEN = () => loadLang('EN');
export const loadNL = () => loadLang('NL');
export const loadCN = () => loadLang('CN');


