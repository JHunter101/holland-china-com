"use strict";
// Common helper function for rendering posts
function renderPosts(type, containerId, allowed) {
    const posts = myData[type];
    let total = 0;
    for (const pid in posts) {
        if (total >= allowed) {
            console.log('all posts rendered', pid);
            break;
        }
        if (document.getElementById(`post-${pid}`)) {
            console.log('post already rendered', pid);
            continue;
        }
        if (!posts[pid].postSites.includes(thisWebsite)) {
            console.log('this post is not on this website', pid);
            continue;
        }
        if (new Date(posts[pid].postTime).getTime() > Date.now()) {
            console.log('this post is for the future', pid);
            continue;
        }
        if (containerId === 'events-upcoming' &&
            new Date(posts[pid].eventTimeStart).getTime() < Date.now()) {
            console.log('this event is not upcoming', pid);
            continue;
        }
        if (containerId === 'events-past' &&
            new Date(posts[pid].eventTimeEnd).getTime() > Date.now()) {
            console.log('this event is not past', pid);
            continue;
        }
        const post = createPostElement(posts[pid], type, pid);
        if (!post)
            continue;
        post.id = `post-${pid}`;
        document.getElementById(containerId).appendChild(post);
        total++;
        console.log('rendered post', pid);
    }
}
// Helper function to create a post element
function createPostElement(post, type, pid) {
    const postElement = document.createElement('div');
    postElement.classList.add(`post-${type}`, 'flex-container-responsive', 'flex-container');
    const postText = document.createElement('div');
    postText.classList.add('post-text');
    postText.classList.add('flex-item-2');
    const postTextTitle = document.createElement('a');
    postTextTitle.classList.add('header--medium');
    postTextTitle.setAttribute('href', `post.html?pid=${pid}`);
    ['GB', 'NL', 'CN'].forEach((lan) => {
        const postTitlelan = createMultilingualElement(post[`postTitle${lan}`], lan);
        postTextTitle.appendChild(postTitlelan);
    });
    const postTextSub = document.createElement('div');
    postTextSub.classList.add('subheader', 'post-data', 'flex-container');
    if (type === 'events') {
        postTextSub.classList.add('flex-container-col');
        const PostTextLocation = document.createElement('h3');
        PostTextLocation.textContent = post.eventLocation;
        const PostTextAddress = document.createElement('h3');
        PostTextAddress.textContent = post.eventAddress;
        postTextSub.appendChild(PostTextLocation);
        postTextSub.appendChild(PostTextAddress);
    }
    if (type === 'news') {
        postTextSub.classList.add('flex-container-row');
        const PostTextTime = document.createElement('h3');
        ['GB', 'NL', 'CN'].forEach((lan) => {
            const PostTextTimeText = lan === 'GB'
                ? `Posted by Xu Xiao Jia on ${post.postTime}`
                : lan === 'NL'
                    ? `Posted by Xu Xiao Jia on ${post.postTime}`
                    : lan === 'NL'
                        ? `Posted by Xu Xiao Jia on ${post.postTime}`
                        : '';
            const PostTextTimelan = document.createElement('div');
            PostTextTimelan.classList.add(lan.toLowerCase());
            PostTextTimelan.textContent = PostTextTimeText;
            PostTextTime.appendChild(PostTextTimelan);
        });
        postTextSub.appendChild(PostTextTime);
    }
    const postTextMain = document.createElement('div');
    postTextMain.classList.add('post-ps');
    const postTextMainText = document.createElement('p');
    ['GB', 'NL', 'CN'].forEach((lan) => {
        const postTextlan = createMultilingualElement(post[`postText${lan}`], lan);
        postTextMainText.appendChild(postTextlan);
    });
    postTextMain.appendChild(postTextMainText);
    const postTextLink = document.createElement('a');
    postTextLink.classList.add('read-more');
    postTextLink.setAttribute('href', `post.html?pid=${pid}`);
    ['GB', 'NL', 'CN'].forEach((lan) => {
        const linkText = lan === 'GB'
            ? 'Read more'
            : lan === 'NL'
                ? 'Lees meer'
                : lan === 'CN'
                    ? '阅读更多'
                    : '';
        const postTextLinklan = document.createElement('div');
        postTextLinklan.classList.add(lan.toLowerCase());
        postTextLinklan.textContent = linkText;
        postTextLink.appendChild(postTextLinklan);
    });
    postText.appendChild(postTextTitle);
    postText.appendChild(postTextSub);
    postText.appendChild(postTextMain);
    postText.appendChild(postTextLink);
    postElement.appendChild(postText);
    const postImageBox = document.createElement('div');
    postImageBox.classList.add('flex-item-2', 'post-image');
    const postImage = document.createElement('img');
    postImage.setAttribute('src', `res/${pid}/${post.postMainImage}`);
    postImageBox.appendChild(postImage);
    postElement.appendChild(postImageBox);
    // Additional logic for events
    if (type === 'events') {
        const postCalendar = document.createElement('div');
        postCalendar.classList.add('flex-item-1', 'flex-container', 'flex-center');
        const postCalendarDate = document.createElement('div');
        postCalendarDate.classList.add('event-date', 'flex-container', 'flex-container-col');
        const postCalendarDateBoxTop = document.createElement('div');
        postCalendarDateBoxTop.classList.add('event-cal-top', 'flex-container');
        const postCalendarDateBoxBot = document.createElement('div');
        postCalendarDateBoxBot.classList.add('event-cal-bot', 'flex-container', 'flex-container-col');
        const postCalendarDateBoxYear = document.createElement('p');
        postCalendarDateBoxYear.classList.add('header--medium', 'text--center');
        const postCalendarDateBoxMonth = document.createElement('p');
        postCalendarDateBoxMonth.classList.add('header--large', 'text--center');
        const postCalendarDateBoxDay = document.createElement('p');
        postCalendarDateBoxDay.classList.add('header--large', 'text--center');
        ['GB', 'NL', 'CN'].forEach((lan) => {
            const lanCode = lan === 'GB'
                ? 'en-GB'
                : lan === 'NL'
                    ? 'nl-NL'
                    : lan === 'CN'
                        ? 'zh-CN'
                        : '';
            const postCalendarDateBoxYearlan = document.createElement('lan');
            postCalendarDateBoxYearlan.classList.add(lan.toLowerCase());
            postCalendarDateBoxYearlan.textContent = new Date(post.eventTimeStart)
                .toLocaleString(lanCode, { year: 'numeric' })
                .toUpperCase();
            postCalendarDateBoxYear.appendChild(postCalendarDateBoxYearlan);
            const postCalendarDateBoxMonthlan = document.createElement('lan');
            postCalendarDateBoxMonthlan.classList.add(lan.toLowerCase());
            postCalendarDateBoxMonthlan.textContent = new Date(post.eventTimeStart)
                .toLocaleString(lanCode, { month: 'short' })
                .toUpperCase();
            postCalendarDateBoxMonth.appendChild(postCalendarDateBoxMonthlan);
            const postCalendarDateBoxDaylan = document.createElement('lan');
            postCalendarDateBoxDaylan.classList.add(lan.toLowerCase());
            postCalendarDateBoxDaylan.textContent = new Date(post.eventTimeStart)
                .toLocaleString(lanCode, { day: '2-digit' })
                .toUpperCase();
            postCalendarDateBoxDay.appendChild(postCalendarDateBoxDaylan);
        });
        postCalendarDateBoxTop.appendChild(postCalendarDateBoxYear);
        postCalendarDateBoxBot.appendChild(postCalendarDateBoxMonth);
        postCalendarDateBoxBot.appendChild(postCalendarDateBoxDay);
        postCalendarDate.appendChild(postCalendarDateBoxTop);
        postCalendarDate.appendChild(postCalendarDateBoxBot);
        postCalendar.appendChild(postCalendarDate);
        postElement.appendChild(postCalendar);
    }
    return postElement;
}
