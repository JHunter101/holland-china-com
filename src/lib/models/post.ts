import type { Locale } from './commonTypes';

export abstract class Post {
    private static nextId = 1;

    public readonly id: string;
    public sources: string[];
    public dateLaunch: Date;
    public titles: Record<Locale, string>;
    public contents: Record<Locale, string>;
    public links: string[];
    public images: string[];

    constructor(
        sources: string[],
        dateLaunch: Date,
        titles: Record<Locale, string>,
        contents: Record<Locale, string>,
        links: string[],
        images: string[]
    ) {
        this.id = (Post.nextId++).toString();
        this.sources = sources;
        this.dateLaunch = dateLaunch;
        this.titles = titles;
        this.contents = contents;
        this.links = links;
        this.images = images;
    }

    getTitle(locale: Locale): string {
        return this.titles[locale];
    }

    getContent(locale: Locale): string {
        return this.contents[locale];
    }
}
