document.addEventListener('DOMContentLoaded', function () {
	const lan = localStorage.getItem('lan') || 'gb';
	loadLan(lan);
	(document.getElementById('nav-lan-current') as HTMLElement).classList.remove(
		'flag-icon-gb',
		'flag-icon-nl',
		'flag-icon-cn'
	);
	(document.getElementById('nav-lan-current') as HTMLElement).classList.add(
		'flag-icon-' + lan
	);
});

const thisWebsite = 'hollandchina.com';

function loadLan(toLoad: string, toHide = ['gb', 'cn', 'nl']) {
	const style = document.createElement('style');
	let css = '';
	toHide = toHide.filter((lang) => lang !== toLoad);
	toHide.forEach((lang) => {
		css += `.${lang} { display: none !important; }\n`;
	});
	css += `.${toLoad} { display: block; }\n`;
	style.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

function createMultilingualElement(text: string, lan: string): HTMLElement {
	const element = document.createElement('lan');
	element.classList.add(lan.toLowerCase());
	element.textContent = text;
	return element;
}

function loadEN() {
	localStorage.setItem('lan', 'gb');
	loadLan('gb');
}

function loadCN() {
	localStorage.setItem('lan', 'cn');
	loadLan('cn');
}

function loadNL() {
	localStorage.setItem('lan', 'nl');
	loadLan('nl');
}

// Common helper function for rendering posts
function renderPosts(
	type: 'news' | 'events',
	containerId: string,
	allowed: number
) {
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

		if (
			containerId === 'events-upcoming' &&
			new Date(posts[pid].eventTimeStart).getTime() < Date.now()
		) {
			console.log('this event is not upcoming', pid);
			continue;
		}

		if (
			containerId === 'events-past' &&
			new Date(posts[pid].eventTimeEnd).getTime() > Date.now()
		) {
			console.log('this event is not past', pid);
			continue;
		}

		const post = createPostElement(posts[pid], type, pid);
		if (!post) continue;

		post.id = `post-${pid}`;

		(document.getElementById(containerId) as HTMLElement).appendChild(post);
		total++;

		console.log('rendered post', pid);
	}
}

// Helper function to create a post element
function createPostElement(
	post: any,
	type: 'news' | 'events',
	pid: string
): HTMLElement | null {
	const postElement = document.createElement('div');
	postElement.classList.add(
		`post-${type}`,
		'flex-container-responsive',
		'flex-container'
	);

	const postText = document.createElement('div');
	postText.classList.add('post-text');
	postText.classList.add('flex-item-2');

	const postTextTitle = document.createElement('a');
	postTextTitle.classList.add('header--medium');
	postTextTitle.setAttribute('href', `post.html?pid=${pid}`);

	['GB', 'NL', 'CN'].forEach((lang) => {
		const postTitleLang = createMultilingualElement(
			post[`postTitle${lang}`],
			lang
		);
		postTextTitle.appendChild(postTitleLang);
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

		['GB', 'NL', 'CN'].forEach((lang) => {
			const PostTextTimeText =
				lang === 'GB'
					? `Posted by Xu Xiao Jia on ${post.postTime}`
					: lang === 'NL'
					? `Posted by Xu Xiao Jia on ${post.postTime}`
					: lang === 'NL'
					? `Posted by Xu Xiao Jia on ${post.postTime}`
					: '';
			const PostTextTimeLang = document.createElement('div');
			PostTextTimeLang.classList.add(lang.toLowerCase());
			PostTextTimeLang.textContent = PostTextTimeText;
			PostTextTime.appendChild(PostTextTimeLang);
		});
		postTextSub.appendChild(PostTextTime);
	}

	const postTextMain = document.createElement('div');
	postTextMain.classList.add('post-ps');

	const postTextMainText = document.createElement('p');
	['GB', 'NL', 'CN'].forEach((lang) => {
		const postTextLang = createMultilingualElement(
			post[`postText${lang}`],
			lang
		);
		postTextMainText.appendChild(postTextLang);
	});

	postTextMain.appendChild(postTextMainText);

	const postTextLink = document.createElement('a');
	postTextLink.classList.add('read-more');
	postTextLink.setAttribute('href', `post.html?pid=${pid}`);

	['GB', 'NL', 'CN'].forEach((lang) => {
		const linkText =
			lang === 'GB'
				? 'Read more'
				: lang === 'NL'
				? 'Lees meer'
				: lang === 'CN'
				? '阅读更多'
				: '';
		const postTextLinkLang = document.createElement('div');
		postTextLinkLang.classList.add(lang.toLowerCase());
		postTextLinkLang.textContent = linkText;
		postTextLink.appendChild(postTextLinkLang);
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

		['GB', 'NL', 'CN'].forEach((lang) => {
			const lanCode =
				lang === 'GB'
					? 'en-GB'
					: lang === 'NL'
					? 'nl-NL'
					: lang === 'CN'
					? 'zh-CN'
					: '';
			const postCalendarDateBoxYearLang = document.createElement('lan');
			postCalendarDateBoxYearLang.classList.add(lang.toLowerCase());
			postCalendarDateBoxYearLang.textContent = new Date(post.eventTimeStart)
				.toLocaleString(lanCode, { year: 'numeric' })
				.toUpperCase();
			postCalendarDateBoxYear.appendChild(postCalendarDateBoxYearLang);

			const postCalendarDateBoxMonthLang = document.createElement('lan');
			postCalendarDateBoxMonthLang.classList.add(lang.toLowerCase());
			postCalendarDateBoxMonthLang.textContent = new Date(
				post.eventTimeStart
			)
				.toLocaleString(lanCode, { month: 'short' })
				.toUpperCase();
			postCalendarDateBoxMonth.appendChild(postCalendarDateBoxMonthLang);

			const postCalendarDateBoxDayLang = document.createElement('lan');
			postCalendarDateBoxDayLang.classList.add(lang.toLowerCase());
			postCalendarDateBoxDayLang.textContent = new Date(post.eventTimeStart)
				.toLocaleString(lanCode, { day: '2-digit' })
				.toUpperCase();
			postCalendarDateBoxDay.appendChild(postCalendarDateBoxDayLang);
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
