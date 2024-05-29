document.addEventListener('DOMContentLoaded', function () {
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
    }
    else if (myData['events'][pid]) {
        type = 'events';
    }
    else {
        window.location.href = './';
    }

    const post = myData[type][pid]; 

    (document.getElementById('post-main-image') as HTMLImageElement).setAttribute('src', 'res/' + pid+ '/' + post.postMainImage);
    (document.getElementById('post-title') as HTMLElement).textContent = post.postTitleCN;
    (document.getElementById('post-date') as HTMLElement).textContent = post.postTime;
    (document.getElementById('post-text') as HTMLElement).textContent = post.postTextCN;

    const postAltImagesElement = document.getElementById('post-alt-images');
    if (postAltImagesElement) {
        postAltImagesElement.innerHTML = ''; // Clear existing images
        post.postOtherImages.forEach((imgSrc: string) => {
            const imgBox = document.createElement('div');
            imgBox.classList.add('swiper-slide');
            const imgElement = document.createElement('img');
            imgElement.src = 'res/' + pid+ '/'
            imgBox.appendChild(imgElement);
            postAltImagesElement.appendChild(imgBox);
        });
    }
}
