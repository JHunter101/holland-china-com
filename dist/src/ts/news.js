"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const posts = myData['news'];
    let pinned = 0;
    let total = 0;
    const allowed = 5;
    const thisWebsite = window.location.href; // Assuming thisWebsite is defined elsewhere
    for (const pid in posts) {
        if (total >= allowed && pinned === 1) {
            break;
        }
        if (total >= allowed && pinned === 0 && !posts[pid].postPinned) {
            continue;
        }
        if (!posts[pid].postSites.includes(thisWebsite)) {
            continue;
        }
        if (new Date(posts[pid].postTime).getTime() > Date.now()) {
            continue;
        }
        const myPost = document.createElement('div');
        myPost.classList.add('post-news', 'flex-container-responsive', 'flex-container');
        const myPostText = document.createElement('div');
        myPostText.classList.add('flex-item', 'post-text');
        const myPostTextTitle = document.createElement('a');
        myPostTextTitle.classList.add('header--medium');
        myPostTextTitle.setAttribute('href', `post.html?pid=${pid}`);
        ['GB', 'NL', 'CN'].forEach(lang => {
            const postTitleLang = createMultilingualElement(posts[pid][`postTitle${lang}`], lang);
            myPostTextTitle.appendChild(postTitleLang);
        });
        const myPostTextSub = document.createElement('div');
        myPostTextSub.classList.add('subheader', 'post-data', 'flex-container', 'flex-row');
        const myPostTextTime = document.createElement('h3');
        myPostTextTime.textContent = `Posted by Xu Xiao Jia on ${posts[pid].postTime}`;
        myPostTextSub.appendChild(myPostTextTime);
        const myPostTextMain = document.createElement('div');
        myPostTextMain.classList.add('post-ps');
        const myPostTextMainText = document.createElement('p');
        ['GB', 'NL', 'CN'].forEach(lang => {
            const postTextLang = createMultilingualElement(posts[pid][`postText${lang}`], lang);
            myPostTextMainText.appendChild(postTextLang);
        });
        myPostTextMain.appendChild(myPostTextMainText);
        const myPostTextLink = document.createElement('a');
        myPostTextLink.classList.add('read-more');
        ['GB', 'NL', 'CN'].forEach(lang => {
            const linkText = (lang === 'GB') ? 'Read more' : (lang === 'NL') ? 'Lees meer' : '阅读更多';
            const myPostTextLinkLang = document.createElement('div');
            myPostTextLinkLang.classList.add(lang.toLowerCase());
            myPostTextLinkLang.textContent = linkText;
            myPostTextLink.appendChild(myPostTextLinkLang);
        });
        myPostTextLink.setAttribute('href', `post.html?pid=${pid}`);
        myPostText.appendChild(myPostTextTitle);
        myPostText.appendChild(myPostTextSub);
        myPostText.appendChild(myPostTextMain);
        myPostText.appendChild(myPostTextLink);
        myPost.appendChild(myPostText);
        const myPostImageBox = document.createElement('div');
        myPostImageBox.classList.add('flex-item', 'post-image');
        const myPostImage = document.createElement('img');
        myPostImage.setAttribute('src', `res/${pid}/${posts[pid].postMainImage}`);
        myPostImageBox.appendChild(myPostImage);
        myPost.appendChild(myPostImageBox);
        if (posts[pid].postPinned) {
            const pinnedNewsContainer = document.getElementById('news-pinned');
            if (pinnedNewsContainer)
                pinnedNewsContainer.appendChild(myPost);
            pinned += 1;
        }
        else {
            const normalNewsContainer = document.getElementById('news-normal');
            if (normalNewsContainer)
                normalNewsContainer.appendChild(myPost);
            total += 1;
        }
    }
});
