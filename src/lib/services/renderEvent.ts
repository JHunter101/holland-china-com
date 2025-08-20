import { EventPost } from '$lib/models/event';
import { EventLocation } from '$lib/models/event';
import { FilterUpcomingPosts } from '$lib/services/renderPost';
import { AppendPostData } from '$lib/services/renderPost';

function LoadEventData(): EventPost[] {
    const sampleLocation1 = new EventLocation(
        'Concert Hall',
        'Main Street',
        '123A',
        '1000AA',
        'Amsterdam',
        'Netherlands'
    );

    const sampleLocation2 = new EventLocation(
        'Conference Center',
        'Second Avenue',
        '45',
        '2000BB',
        'Rotterdam',
        'Netherlands'
    );

    return [
        new EventPost(
            ['Official site', 'Eventbrite'],
            new Date('2025-07-20'),
            {
                EN: 'Summer Music Festival',
                NL: 'Zomer Muziekfestival',
                CN: '夏季音乐节'
            },
            {
                EN: `Join us for an unforgettable music festival featuring top artists from around the world. The Summer Music Festival spans three days filled with diverse performances across multiple genres including rock, pop, jazz, and electronic music. Attendees will also enjoy food trucks, artisan markets, workshops, and activities for all ages. This event is perfect for music lovers looking to experience new sounds and meet fellow fans in a vibrant and festive atmosphere. Tickets are selling fast, so be sure to reserve your spot early!`,
                NL: `Doe mee aan een onvergetelijk muziekfestival met topartiesten van over de hele wereld. Het Zomer Muziekfestival beslaat drie dagen met diverse optredens in verschillende genres, waaronder rock, pop, jazz en elektronische muziek. Bezoekers kunnen ook genieten van foodtrucks, ambachtsmarkten, workshops en activiteiten voor alle leeftijden. Dit evenement is perfect voor muziekliefhebbers die nieuwe geluiden willen ontdekken en gelijkgestemde fans willen ontmoeten in een levendige en feestelijke sfeer. Tickets gaan hard, dus reserveer snel je plek!`,
                CN: `加入我们，享受难忘的音乐节，汇聚来自世界各地的顶级艺术家。夏季音乐节为期三天，涵盖摇滚、流行、爵士和电子音乐等多种风格的表演。观众还能享受美食车、手工艺市场、工作坊和适合所有年龄段的活动。这个活动非常适合喜欢音乐的朋友们，在充满活力和节日气氛中体验新声音，结识志同道合的朋友。门票销售火爆，务必提前预订！`
            },
            ['https://summerfest.com'],
            ['https://summerfest.com/banner.jpg'],
            sampleLocation1,
            new Date('2025-08-10T18:00:00'),
            new Date('2025-08-12T23:00:00'),
            'https://summerfest.com/signup'
        ),
        new EventPost(
            ['Conference site'],
            new Date('2025-06-15'),
            {
                EN: 'Tech Innovators Conference',
                NL: 'Conferentie voor Technologische Innovators',
                CN: '科技创新者大会'
            },
            {
                EN: `Discover the future of technology at the annual Tech Innovators Conference. This three-day event brings together leading experts, entrepreneurs, and innovators to share insights about the latest trends in AI, robotics, cybersecurity, and green tech. Participants can attend keynote speeches, panel discussions, and hands-on workshops designed to spark creativity and collaboration. Whether you are a startup founder, developer, or industry professional, this conference offers valuable opportunities to network, learn, and shape the tech landscape of tomorrow.`,
                NL: `Ontdek de toekomst van technologie tijdens de jaarlijkse Conferentie voor Technologische Innovators. Dit driedaagse evenement brengt topexperts, ondernemers en vernieuwers samen om inzichten te delen over de nieuwste trends in AI, robotica, cybersecurity en groene technologie. Deelnemers kunnen keynotes, paneldiscussies en praktische workshops bijwonen die creativiteit en samenwerking stimuleren. Of je nu een startup-oprichter, ontwikkelaar of professional bent, deze conferentie biedt waardevolle kansen om te netwerken, te leren en de technologische toekomst vorm te geven.`,
                CN: `在年度科技创新者大会上探索科技的未来。为期三天的活动汇聚了领先的专家、企业家和创新者，共享关于人工智能、机器人技术、网络安全和绿色技术的最新趋势。参与者可以参加主题演讲、小组讨论和实践工作坊，激发创造力与合作。无论您是创业者、开发者还是行业专业人士，这次会议都为您提供了宝贵的机会进行交流、学习并塑造未来的科技格局。`
            },
            ['https://techinnovators.com'],
            ['https://techinnovators.com/logo.png'],
            sampleLocation2,
            new Date('2025-09-05T09:00:00'),
            new Date('2025-09-07T17:00:00'),
            'https://techinnovators.com/register'
        )
    ];
}

export function RenderEvents(page: number = 1, count: number = 5): HTMLElement {
    const myEvents = LoadEventData();

    const eventsToLoad = FilterUpcomingPosts<EventPost>(
        myEvents,
        e => e.sources,
        e => new Date(e.dateLaunch),
        page,
        count
    );

    const container = document.createElement('div');
    container.className = 'event-container';

    for (const event of eventsToLoad) {
        const eventHtml = RenderEventPost(event);
        container.appendChild(eventHtml);
    }

    return container;
}


export function RenderEventPost(event: EventPost): HTMLDivElement;
export function RenderEventPost(id: string): HTMLDivElement;
export function RenderEventPost(arg: EventPost | string): HTMLDivElement {
    var postContainer = document.createElement('div');

    const event: EventPost | undefined =
        typeof arg === 'string'
            ? LoadEventData().find(e => e.id === arg)
            : arg;

    if (!event) {
        window.location.href = './';
        return postContainer;
    }

    postContainer.classList.add(
        `post-event`,
        'flex-container-responsive',
        'flex-container'
    );

    postContainer = AppendPostData(postContainer, event)
    postContainer = AppendEventData(postContainer, event)

    return postContainer;
}

function AppendEventData(postContainer: HTMLDivElement, event: EventPost): HTMLDivElement {
    const postSubtitle = postContainer.querySelector('.subheader');
    postSubtitle!.classList.add('flex-container-col');

    const locationName = document.createElement('h3');
    locationName.textContent = event.location.name;

    const locationAddress = document.createElement('h3');
    locationAddress.textContent = event.location.name;

    const eventAddress = document.createElement('h3');
    eventAddress.textContent = `${event.location.streetName} ${event.location.streetNumber}, ${event.location.postalCode} ${event.location.city}, ${event.location.country}`;

    postSubtitle!.append(locationName, locationAddress, eventAddress);

    const postCalendar = document.createElement('div');
    postCalendar.classList.add(
        'flex-item-1',
        'flex-container',
        'flex-center'
    );

    const postCalendarDate = document.createElement('div');
    postCalendarDate.classList.add(
        'event-date',
        'flex-container',
        'flex-container-col'
    );

    const postCalendarDateBoxTop = document.createElement('div');
    postCalendarDateBoxTop.classList.add('event-cal-top', 'flex-container');

    const postCalendarDateBoxBot = document.createElement('div');
    postCalendarDateBoxBot.classList.add(
        'event-cal-bot',
        'flex-container',
        'flex-container-col'
    );

    const postCalendarDateBoxYear = document.createElement('p');
    postCalendarDateBoxYear.classList.add('header--medium', 'text--center');
    const postCalendarDateBoxMonth = document.createElement('p');
    postCalendarDateBoxMonth.classList.add('header--large', 'text--center');
    const postCalendarDateBoxDay = document.createElement('p');
    postCalendarDateBoxDay.classList.add('header--large', 'text--center');

    const lanCode = "gb"
    postCalendarDateBoxYear.textContent = new Date(event.eventStart)
        .toLocaleString(lanCode, { year: 'numeric' })
        .toUpperCase();
    postCalendarDateBoxYear.appendChild(postCalendarDateBoxYear);

    postCalendarDateBoxMonth.textContent = new Date(event.eventStart)
        .toLocaleString(lanCode, { month: 'short' })
        .toUpperCase();
    postCalendarDateBoxMonth.appendChild(postCalendarDateBoxMonth);

    postCalendarDateBoxDay.textContent = new Date(event.eventStart)
        .toLocaleString(lanCode, { day: '2-digit' })
        .toUpperCase();

    postCalendarDateBoxTop.appendChild(postCalendarDateBoxYear);
    postCalendarDateBoxBot.appendChild(postCalendarDateBoxMonth);
    postCalendarDateBoxBot.appendChild(postCalendarDateBoxDay);

    postCalendarDate.appendChild(postCalendarDateBoxTop);
    postCalendarDate.appendChild(postCalendarDateBoxBot);
    postCalendar.appendChild(postCalendarDate);

    postContainer.appendChild(postCalendar);

    return postContainer;
}


