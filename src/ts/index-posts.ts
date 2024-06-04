document.addEventListener('DOMContentLoaded', function () {
    let posts = myData['news'];
    let total = 0;
    let allowed = 3;

    for (const pid in posts) {
        if (total >= allowed) {
            break;
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
        myPostTextLink.setAttribute('href', `post.html?pid=${pid}`);
        ['GB', 'NL', 'CN'].forEach(lang => {
            const linkText = (lang === 'GB') ? 'Read more' : (lang === 'NL') ? 'Lees meer' : '阅读更多';
            const myPostTextLinkLang = document.createElement('div');
            myPostTextLinkLang.classList.add(lang.toLowerCase());
            myPostTextLinkLang.textContent = linkText;
            myPostTextLink.appendChild(myPostTextLinkLang);
        });
        
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
        
        document.getElementById('news-normal')?.appendChild(myPost);
        total += 1;
    }

    posts = myData['events']

    total = 0
    allowed = 1

    for (const pid in posts) {
        if (total >= allowed) {
            break
        }

        if (!posts[pid].postSites.includes(thisWebsite)) {
            continue
        }

        if (new Date(posts[pid].postTime).getTime() > Date.now()) {
            continue
        }

        const myPost = document.createElement('div')
        myPost.classList.add('post-news', 'flex-container-responsive', 'flex-container')

        const myPostText = document.createElement('div')
        myPostText.classList.add('flex-item-2', 'post-text')

        const myPostTextTitle = document.createElement('a')
        myPostTextTitle.classList.add('header--medium')
        myPostTextTitle.setAttribute('href', `post.html?pid=${pid}`);
        ['GB', 'NL', 'CN'].forEach(lang => {
            const postTitleLang = createMultilingualElement(posts[pid][`postTitle${lang}`], lang);
            myPostTextTitle.appendChild(postTitleLang);
        });


        const myPostTextSub = document.createElement('div')
        myPostTextSub.classList.add('subheader', 'post-data', 'flex-container', 'flex-container-col')

        const myPostTextLocation = document.createElement('h3')
        myPostTextLocation.textContent = posts[pid].eventLocation

        const myPostTextAddress = document.createElement('h3')
        myPostTextAddress.textContent = posts[pid].eventAddress

        myPostTextSub.appendChild(myPostTextLocation)
        myPostTextSub.appendChild(myPostTextAddress)

        const myPostTextMain = document.createElement('div')
        myPostTextMain.classList.add('post-ps')

        const myPostTextMainText = document.createElement('p');
        ['GB', 'NL', 'CN'].forEach(lang => {
            const postTextLang = createMultilingualElement(posts[pid][`postText${lang}`], lang);
            myPostTextMainText.appendChild(postTextLang);
        });

        myPostTextMain.appendChild(myPostTextMainText)

        const myPostTextLink = document.createElement('a')
        myPostTextLink.classList.add('read-more')
        myPostTextLink.setAttribute('href', `post.html?pid=${pid}`);
        ['GB', 'NL', 'CN'].forEach(lang => {
            const linkText = (lang === 'GB') ? 'Read more' : (lang === 'NL') ? 'Lees meer' : '阅读更多';
            const myPostTextLinkLang = document.createElement('div');
            myPostTextLinkLang.classList.add(lang.toLowerCase());
            myPostTextLinkLang.textContent = linkText;
            myPostTextLink.appendChild(myPostTextLinkLang);
        });

        myPostText.appendChild(myPostTextTitle)
        myPostText.appendChild(myPostTextSub)
        myPostText.appendChild(myPostTextMain)
        myPostText.appendChild(myPostTextLink)
        myPost.appendChild(myPostText)

        const myPostImageBox = document.createElement('div')
        myPostImageBox.classList.add('flex-item-2', 'post-image')

        const myPostImage = document.createElement('img')
        myPostImage.setAttribute('src', `res/${pid}/${posts[pid].postMainImage}`)
        myPostImageBox.appendChild(myPostImage)
        myPost.appendChild(myPostImageBox)

        const myPostCalendar = document.createElement('div')
        myPostCalendar.classList.add('flex-item-1', 'flex-container', 'flex-center')

        const myPostCalendarDate = document.createElement('div')
        myPostCalendarDate.classList.add('event-date', 'flex-container', 'flex-container-col')

        const myPostCalendarDateBoxTop = document.createElement('div')
        myPostCalendarDateBoxTop.classList.add('event-month', 'flex-container')

        const myPostCalendarDateBoxYear = document.createElement('p')
        myPostCalendarDateBoxYear.classList.add('header--medium', 'text--center')
        myPostCalendarDateBoxYear.textContent = new Date(posts[pid].eventTimeStart).toLocaleString('default', { year: 'numeric' }).toUpperCase()

        myPostCalendarDateBoxTop.appendChild(myPostCalendarDateBoxYear)


        const myPostCalendarDateBoxBot = document.createElement('div')
        myPostCalendarDateBoxBot.classList.add('event-day', 'flex-container', 'flex-container-col')

        const month = new Date(posts[pid].eventTimeStart).toLocaleString('default', { month: 'short' })
        const day = new Date(posts[pid].eventTimeStart).toLocaleString('default', { day: '2-digit' })

        const myPostCalendarDateBoxMonth = document.createElement('p')
        myPostCalendarDateBoxMonth.classList.add('header--large', 'text--center')
        const myPostCalendarDateBoxDay = document.createElement('p')
        myPostCalendarDateBoxDay.classList.add('header--large', 'text--center')
        myPostCalendarDateBoxMonth.textContent = month
        myPostCalendarDateBoxDay.textContent = day


        myPostCalendarDateBoxBot.appendChild(myPostCalendarDateBoxMonth)
        myPostCalendarDateBoxBot.appendChild(myPostCalendarDateBoxDay)

        myPostCalendarDate.appendChild(myPostCalendarDateBoxTop)
        myPostCalendarDate.appendChild(myPostCalendarDateBoxBot)
        myPostCalendar.appendChild(myPostCalendarDate)
        myPost.appendChild(myPostCalendar)

        if (new Date(posts[pid].eventTimeStart).getTime() > Date.now()) {
            (document.getElementById('events-upcoming') as HTMLElement).appendChild(myPost)
        }

        total += 1
    }

});
