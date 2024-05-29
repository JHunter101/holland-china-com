document.addEventListener('DOMContentLoaded', function () {
    const posts = myData['news'];
        
    let pinned = 0;
    let total = 0;
    const allowed = 5;

    for (const pid in posts) {
        if (total >= allowed && pinned == 1) {
            break;
        }

        if (total >= allowed && pinned == 0 && !posts[pid].postPinned) {
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
        myPostTextTitle.textContent = posts[pid].postTitleCN;
        myPostTextTitle.setAttribute('href', `post.html?pid=${pid}`);
        
        const myPostTextSub = document.createElement('div');
        myPostTextSub.classList.add('subheader', 'post-data', 'flex-container', 'flex-row');
        
        const myPostTextTime = document.createElement('h3');
        myPostTextTime.textContent = `Posted by Xu Xiao Jia on ${posts[pid].postTime}`;

        myPostTextSub.appendChild(myPostTextTime);
        
        const myPostTextMain = document.createElement('div');
        myPostTextMain.classList.add('post-ps');
        
        const myPostTextMainText = document.createElement('p');
        myPostTextMainText.textContent = posts[pid].postTextCN;

        myPostTextMain.appendChild(myPostTextMainText);
        
        const myPostTextLink = document.createElement('a');
        myPostTextLink.textContent = 'Read more';
        myPostTextLink.classList.add('read-more');
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
            document.getElementById('news-pinned')!.appendChild(myPost);
            pinned += 1;
        } else {
            document.getElementById('news-normal')!.appendChild(myPost);
            total += 1;
        }
    }
});
