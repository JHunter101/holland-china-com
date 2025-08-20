import type { Locale } from './commonTypes';
import { Post } from './post';

export class EventPost extends Post {
    public location: EventLocation;
    public eventStart: Date;
    public eventEnd: Date;
    public linkSignUp: string;

    public get isPassed(): boolean {
        return this.eventEnd < new Date();
    }

    constructor(
        sources: string[],
        dateLaunch: Date,
        title: Record<Locale, string>,
        content: Record<Locale, string>,
        links: string[],
        images: string[],
        location: EventLocation,
        eventStart: Date,
        eventEnd: Date,
        linkSignUp: string
    ) {
        super(sources, dateLaunch, title, content, links, images);
        this.location = location;
        this.eventStart = eventStart;
        this.eventEnd = eventEnd;
        this.linkSignUp = linkSignUp;
    }
}

export class EventLocation {
    public name: string;
    public streetName: string;
    public streetNumber: string;
    public postalCode: string;
    public city: string;
    public country: string;

    constructor(
        name: string,
        streetName: string,
        streetNumber: string,
        postalCode: string,
        city: string,
        country: string
    ) {
        this.name = name;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }
}
