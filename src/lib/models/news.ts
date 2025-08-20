import type { Locale } from './commonTypes';
import { Post } from './post';

export class NewsPost extends Post {
    public isPinned: boolean;

    constructor(
        sources: string[],
        dateLaunch: Date,
        title: Record<Locale, string>,
        content: Record<Locale, string>,
        links: string[],
        images: string[],
        isPinned: boolean
    ) {
        super(sources, dateLaunch, title, content, links, images);
        this.isPinned = isPinned;
    }
}