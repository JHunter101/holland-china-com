"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const searchParams = new URL(window.location.href).searchParams;
    const pid = searchParams.get('pid');
    if (pid) {
        loadPostInfo(pid);
    }
    else {
        window.location.href = './';
    }
});
function loadPostInfo(pid) {
    let type = 'news';
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
    document.getElementById('post-main-image').setAttribute('src', 'res/' + pid + '/' + post.postMainImage);
    document.getElementById('post-title').textContent = post.postTitleCN;
    document.getElementById('post-date').textContent = post.postTime;
    document.getElementById('post-text').textContent = post.postTextCN;
    const postAltImagesElement = document.getElementById('post-alt-images');
    if (postAltImagesElement) {
        postAltImagesElement.innerHTML = ''; // Clear existing images
        post.postOtherImages.forEach((imgSrc) => {
            const imgBox = document.createElement('div');
            imgBox.classList.add('swiper-slide');
            const imgElement = document.createElement('img');
            imgElement.src = 'res/' + pid + '/';
            imgBox.appendChild(imgElement);
            postAltImagesElement.appendChild(imgBox);
        });
    }
}
