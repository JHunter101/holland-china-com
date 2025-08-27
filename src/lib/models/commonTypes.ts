export type Locale = 'EN' | 'NL' | 'CN';
export type PostMeta = { id: string; title: string; sortDate: string; launchDate: string };

export interface LangData {
    [key: string]: string;
}
