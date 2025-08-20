import { NewsPost } from '$lib/models/news';
import { AppendPostData, FilterUpcomingPosts } from '$lib/services/renderPost';

function LoadNewsData(): NewsPost[] {
    return [
        new NewsPost(
            ['News Agency'],
            new Date('2025-07-01'),
            {
                EN: 'New regulations in effect',
                NL: 'Nieuwe regelgeving van kracht',
                CN: '新法规生效'
            },
            {
                EN: `The government has implemented new regulations effective from August 1, aimed at improving environmental standards and workplace safety. These regulations include stricter emission limits for factories, mandatory safety training for all employees, and enhanced reporting requirements. Businesses are advised to review their current compliance measures to ensure they meet the new standards. The government will provide support and resources to help companies transition smoothly and avoid penalties.`,
                NL: `De overheid heeft nieuwe regelgeving ingevoerd die vanaf 1 augustus van kracht is, gericht op het verbeteren van milieunormen en werkplekontveiligheid. Deze regels omvatten strengere emissiegrenzen voor fabrieken, verplichte veiligheidstraining voor alle werknemers en uitgebreide rapportageverplichtingen. Bedrijven worden geadviseerd hun huidige nalevingsmaatregelen te herzien om aan de nieuwe normen te voldoen. De overheid zal ondersteuning en middelen bieden om bedrijven soepel te laten overstappen en boetes te voorkomen.`,
                CN: `政府已于8月1日起实施新法规，旨在提高环境标准和工作场所安全。这些法规包括对工厂排放限制的加强、所有员工必须接受安全培训以及加强报告要求。建议企业审查现有的合规措施，以确保符合新标准。政府将提供支持和资源，帮助企业顺利过渡，避免罚款。`
            },
            ['https://newsagency.com/regulations'],
            ['https://newsagency.com/images/regulations.jpg'],
            true
        ),
        new NewsPost(
            ['Local Reporter'],
            new Date('2025-07-03'),
            {
                EN: 'City park renovation complete',
                NL: 'Stadspark renovatie voltooid',
                CN: '城市公园翻新完成'
            },
            {
                EN: `The renovation of the central city park has been completed after six months of construction. The project included upgrading playgrounds with new equipment, installing modern lighting along walking paths, planting additional trees and flowers, and improving accessibility features for disabled visitors. The community is invited to celebrate the reopening with a weekend of free activities, including guided nature walks, live music, and family-friendly games. This revitalized park aims to provide a safe, beautiful space for relaxation and recreation for all residents.`,
                NL: `De renovatie van het centrale stadspark is voltooid na zes maanden bouw. Het project omvatte het vernieuwen van speeltuinen met nieuw materiaal, het plaatsen van moderne verlichting langs wandelpaden, het planten van extra bomen en bloemen, en het verbeteren van toegankelijkheidsvoorzieningen voor mindervaliden. De gemeenschap is uitgenodigd om de heropening te vieren met een weekend vol gratis activiteiten, waaronder begeleide natuurwandelingen, live muziek en gezelschapsspellen voor het hele gezin. Dit vernieuwde park biedt een veilige en mooie plek voor ontspanning en recreatie voor alle inwoners.`,
                CN: `经过六个月的施工，市中心公园的翻新工程已完成。项目包括升级游乐场设备、沿步道安装现代照明、种植更多树木和花卉，并改善残障人士的无障碍设施。社区居民受邀参加为期周末的免费庆祝活动，包括导览自然步行、现场音乐和适合家庭的游戏。这个焕然一新的公园旨在为所有居民提供一个安全、美丽的休闲娱乐场所。`
            },
            ['https://localnews.com/park-renovation'],
            ['https://localnews.com/images/park.jpg'],
            false
        )
    ];
}

export function RenderNews(page: number = 1, count: number = 5): HTMLElement {
    const myNews = LoadNewsData();

    const newsToLoad = FilterUpcomingPosts<NewsPost>(
        myNews,
        e => e.sources,
        e => new Date(e.dateLaunch),
        page,
        count
    );

    const container = document.createElement('div');
    container.className = 'news-container';

    for (const news of newsToLoad) {
        const eventHtml = RenderNewsPost(news);
        container.appendChild(eventHtml);
    }

    return container;
}


export function RenderNewsPost(event: NewsPost): HTMLDivElement;
export function RenderNewsPost(id: string): HTMLDivElement;
export function RenderNewsPost(arg: NewsPost | string): HTMLDivElement {
    var postContainer = document.createElement('div');

    const news: NewsPost | undefined =
        typeof arg === 'string'
            ? LoadNewsData().find(e => e.id === arg)
            : arg;

    if (!news) {
        window.location.href = './';
        return postContainer;
    }

    postContainer.classList.add(
        `post-news`,
        'flex-container-responsive',
        'flex-container'
    );

    postContainer = AppendPostData(postContainer, news)
    postContainer = AppendNewsData(postContainer, news)

    return postContainer;
}

function AppendNewsData(postContainer: HTMLDivElement, news: NewsPost): HTMLDivElement {
    const postSubtitle = postContainer.querySelector('.subheader');
    postSubtitle!.classList.add('flex-container-row');

    const PostTextTime = document.createElement('h3');
    PostTextTime.textContent = `Posted by Xu Xiao Jia on ${news.dateLaunch}`
    postSubtitle!.appendChild(PostTextTime);

    return postContainer;
}
