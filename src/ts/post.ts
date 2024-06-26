document.addEventListener('DOMContentLoaded', () => {
	const searchParams = new URL(window.location.href).searchParams;
	const pid = searchParams.get('pid');

	if (pid) {
		loadPostInfo(pid);
	} else {
		window.location.href = './';
	}
});

function loadPostInfo(pid: string) {
	let type: 'news' | 'events' = 'news';
	if (myData['news'][pid]) {
		type = 'news';
	} else if (myData['events'][pid]) {
		type = 'events';
	} else {
		window.location.href = './';
	}

	const post = myData[type][pid];

	const postMainImage = document.getElementById(
		'post-main-image'
	) as HTMLImageElement;
	postMainImage.src = `res/${pid}/${post.postMainImage}`;

	const postDate = document.getElementById('post-date') as HTMLElement;
	postDate.textContent = post.postTime;

	const postTitle = document.getElementById('post-title') as HTMLElement;
	['GB', 'NL', 'CN'].forEach((lan) => {
		const postTitlelan = createMultilingualElement(
			post[`postTitle${lan}`],
			lan
		);
		postTitle.appendChild(postTitlelan);
	});

	const postText = document.getElementById('post-text') as HTMLElement;
	['GB', 'NL', 'CN'].forEach((lan) => {
		const postTextlan = createMultilingualElement(
			post[`postText${lan}`],
			lan
		);
		postText.appendChild(postTextlan);
	});

	const postAltImagesElement = document.getElementById('post-alt-images');
	if (postAltImagesElement) {
		postAltImagesElement.innerHTML = '';
		post.postOtherImages.forEach((imgSrc: string) => {
			const imgBox = document.createElement('div');
			imgBox.classList.add('swiper-slide');
			const imgElement = document.createElement('img');
			imgElement.src = `res/${pid}/${imgSrc}`;
			imgBox.appendChild(imgElement);
			postAltImagesElement.appendChild(imgBox);
		});
	}

	if (post.postLinkedIn) {
		const postLinkedin = document.getElementById(
			'post-linkedin'
		) as HTMLElement;
		const postLinkedinLink = document.getElementById(
			'post-linkedin-link'
		) as HTMLAnchorElement;

		postLinkedin.classList.remove('hidden');
		postLinkedinLink.href = post.postLinkedIn;
	}

	if (post.postLink) {
		const postRelated = document.getElementById(
			'post-related'
		) as HTMLElement;
		const postRelatedLink = document.getElementById(
			'post-related-link'
		) as HTMLAnchorElement;

		postRelated.classList.remove('hidden');
		postRelatedLink.href = post.postLink;

		if (post.postLinkTitle) {
			postRelatedLink.textContent = post.postLinkTitle;
		} else {
			postRelatedLink.textContent = 'Link';
		}
	}
}
