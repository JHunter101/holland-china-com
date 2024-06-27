document.addEventListener('DOMContentLoaded', function () {
	const lan = localStorage.getItem('lan') || 'gb';
	loadLan(lan);
});

const thisWebsite = 'hollandchina.com';

function loadLan(toLoad: string, toHide = ['gb', 'cn', 'nl']) {
	const style = document.createElement('style');
	let css = '';
	toHide = toHide.filter((lan) => lan !== toLoad);
	toHide.forEach((lan) => {
		css += `.${lan} { display: none !important; }\n`;
	});
	css += `.${toLoad} { display: block; }\n`;
	style.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(style);

	(document.getElementById('nav-lan-current') as HTMLElement).classList.remove(
		'flag-icon-gb',
		'flag-icon-nl',
		'flag-icon-cn'
	);
	(document.getElementById('nav-lan-current') as HTMLElement).classList.add(
		'flag-icon-' + toLoad
	);
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

