// When the user scrolls the page, execute myFunction
window.onscroll = function () {
	const header: HTMLElement | null = document.getElementById('js-nav-bar');
	if (header) {
		const sticky = header.offsetTop;
		if (window.scrollY > sticky) {
			header.classList.remove('js-nav-bar--transparent');
			header.classList.add('js-nav-bar--solid');
		} else {
			header.classList.add('js-nav-bar--transparent');
			header.classList.remove('js-nav-bar--solid');
		}
	}
};

const showMenu = (toggleId: string, navId: string) => {
	const toggle = document.getElementById(toggleId) as HTMLElement;
	const nav = document.getElementById(navId) as HTMLElement;
	nav.classList.toggle('show-menu');
	toggle_elem(navId);
	toggle.classList.toggle('show-icon');
};
