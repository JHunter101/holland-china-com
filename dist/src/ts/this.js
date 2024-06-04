"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const lan = localStorage.getItem('lan') || 'gb';
    loadLan(lan);
    document.getElementById('nav-lan-current').classList.remove('flag-icon-gb', 'flag-icon-nl', 'flag-icon-cn');
    document.getElementById('nav-lan-current').classList.add('flag-icon-' + lan);
});
const thisWebsite = 'hollandchina.com';
function loadLan(toLoad, toHide = ['gb', 'cn', 'nl']) {
    const style = document.createElement('style');
    let css = '';
    toHide = toHide.filter(lang => lang !== toLoad);
    toHide.forEach(lang => {
        css += `.${lang} { display: none !important; }\n`;
    });
    css += `.${toLoad} { display: block; }\n`;
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
}
function createMultilingualElement(text, lan) {
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
