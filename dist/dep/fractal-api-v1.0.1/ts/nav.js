"use strict";
// When the user scrolls the page, execute myFunction
window.onscroll = function () {
    const header = document.getElementById('js-nav-bar');
    if (header) {
        const sticky = header.offsetTop;
        if (window.scrollY > sticky) {
            header.classList.remove('js-nav-bar--transparent');
            header.classList.add('js-nav-bar--solid');
        }
        else {
            header.classList.add('js-nav-bar--transparent');
            header.classList.remove('js-nav-bar--solid');
        }
    }
};
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    nav.classList.toggle('show-menu');
    toggle_elem(navId);
    toggle.classList.toggle('show-icon');
};