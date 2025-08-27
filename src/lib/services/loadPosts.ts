import type { PostMeta } from '$lib/models/commonTypes';
import type { EventPost } from '$lib/models/event';
import type { NewsPost } from '$lib/models/news';


export async function loadEventPost(meta: PostMeta): Promise<EventPost | null> {
    try {
        const res = await fetch(`/posts/events/${meta.id}.json`);
        if (!res.ok) throw new Error(`Failed to load ${meta.id}`);
        const data = await res.json();
        data.eventStart = new Date(data.eventStart);
        data.eventEnd = new Date(data.eventEnd);
        data.dateLaunch = new Date(data.dateLaunch);
        return data as EventPost;
    } catch (err) {
        console.error('Error loading event', meta.id, err);
        return null;
    }
}

export async function loadNewsPost(meta: PostMeta): Promise<NewsPost | null> {
    try {
        const res = await fetch(`/posts/news/${meta.id}.json`);
        if (!res.ok) throw new Error(`Failed to load ${meta.id}`);
        const data = await res.json();
        data.date = new Date(data.date);
        return data as NewsPost;
    } catch (err) {
        console.error('Error loading news', meta.id, err);
        return null;
    }
}

export async function loadIndex(type: 'events' | 'news'): Promise<PostMeta[]> {
    const res = await fetch(`/posts/${type}/index.json`);
    if (!res.ok) throw new Error(`Failed to load ${type} index`);
    return await res.json();
}

export async function loadEventPosts(page?: number, pageSize?: number): Promise<EventPost[]> {
    const index = await loadIndex('events');
    const now = new Date();
    let events = index.filter((e) => new Date(e.launchDate) < now);

    if (page !== undefined && pageSize !== undefined) {
        events = events.slice((page - 1) * pageSize, page * pageSize);
    }

    return (await Promise.all(events.map(loadEventPost))).filter(
        (e): e is EventPost => e !== null
    );
}

export async function loadNewsPosts(page?: number, pageSize?: number): Promise<NewsPost[]> {
    const index = await loadIndex('news');
    const now = new Date();
    let news = index.filter((e) => new Date(e.launchDate) < now);

    if (page !== undefined && pageSize !== undefined) {
        news = news.slice((page - 1) * pageSize, page * pageSize);
    }

    return (await Promise.all(news.map(loadNewsPost))).filter(
        (n): n is NewsPost => n !== null
    );
}



export async function loadFirstUpcomingEvent(): Promise<EventPost | null> {
    const events = await loadEventPosts();
    const now = new Date();
    const upcomingEvent = events.find(event => event.dateLaunch > now);
    return upcomingEvent || null;
}


export async function loadLatestNews(limit: number): Promise<NewsPost[]> {
    const news = await loadNewsPosts();
    return news.slice(0, limit);
}