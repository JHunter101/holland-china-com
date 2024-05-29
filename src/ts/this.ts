document.addEventListener('DOMContentLoaded', function () {
    const lan = localStorage.getItem('lan') || 'gb';

    (document.getElementById('nav-lan-current') as HTMLElement).classList.remove('flag-icon-gb', 'flag-icon-nl', 'flag-icon-cn');

    (document.getElementById('nav-lan-current') as HTMLElement).classList.add('flag-icon-' + lan);
})


const thisWebsite = 'hollandchina.com';

function loadEN() {
    localStorage.setItem('lan', 'gb');
}

function loadCN() {
    localStorage.setItem('lan', 'cn');
}

function loadNL() {
    localStorage.setItem('lan', 'nl');
}