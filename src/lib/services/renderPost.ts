import { ThisPage } from '../../ts/shared/thisPage';
import { Post } from '$lib/models/post';

export function FilterUpcomingPosts<T>(
    data: T[],
    getSources: (item: T) => string[],
    getLaunchDate: (item: T) => Date,
    page: number,
    count: number
): T[] {
    const filtered: T[] = [];
    const now = new Date();

    const skipCount = (page - 1) * count;
    let skipped = 0;

    for (const item of data) {
        if (!getSources(item).includes(ThisPage.webLink)) continue;
        if (getLaunchDate(item) <= now) continue;

        if (skipped < skipCount) {
            skipped++;
            continue;
        }

        filtered.push(item);
        if (filtered.length >= count) break;
    }

    return filtered;
}


export function AppendPostData(postContainer: HTMLDivElement, post: Post): HTMLDivElement {

    const postText = document.createElement('div');
    postText.classList.add('post-text');
    postText.classList.add('flex-item-2');

    const postTextTitle = document.createElement('a');
    postTextTitle.classList.add('header--medium');
    postTextTitle.setAttribute('href', `post.html?pid=${post.id}`);

    const postTextSubtitle = document.createElement('div');
    postTextSubtitle.classList.add('subheader', 'post-data', 'flex-container');

    const postTextContent = document.createElement('div');
    postTextContent.classList.add('post-ps');

    const postTextMainText = document.createElement('p');
    postTextContent.appendChild(postTextMainText);

    const postTextLink = document.createElement('a');
    postTextLink.classList.add('read-more');
    postTextLink.setAttribute('href', `post.html?pid=${post.id}`);

    postText.appendChild(postTextTitle);
    postText.appendChild(postTextSubtitle);
    postText.appendChild(postTextContent);
    postText.appendChild(postTextLink);

    const postImageBox = document.createElement('div');
    postImageBox.classList.add('flex-item-2', 'post-image');

    const postImage = document.createElement('img');
    postImage.setAttribute('src', `res/${post.id}/${post.images[0]}`);
    postImageBox.appendChild(postImage);

    postContainer.appendChild(postText);
    postContainer.appendChild(postImageBox);

    return postContainer;
}