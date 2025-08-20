<script lang="ts">
	import { langData, currentLang, loadEN, loadNL, loadCN } from '../stores';
	import { browser } from '$app/environment';

	const navItems = ['home', 'about', 'news', 'events', 'services', 'partners', 'contact'];
	$: currentFlag = $currentLang === 'NL' ? 'nl' : $currentLang === 'CN' ? 'cn' : 'gb';

	let menuOpen = false;
	const toggleMenu = () => (menuOpen = !menuOpen);

	let header: HTMLElement | null;

	const updateHeaderTransparency = () => {
		if (!header) return;
		const main = document.querySelector('main');
		const firstChild = main?.firstElementChild;
		const allowTransparent = firstChild?.classList.contains('fullscreen-image');

		if (window.innerWidth < 1200 || !allowTransparent) {
			header.classList.add('nav-solid');
			header.classList.remove('nav-transparent');
		} else {
			header.classList.toggle('nav-solid', window.scrollY > header.offsetTop);
			header.classList.toggle('nav-transparent', window.scrollY <= header.offsetTop);
		}
	};

	if (browser) {
		$: {
			header = document.getElementById('header');
			updateHeaderTransparency();
			window.addEventListener('scroll', updateHeaderTransparency);
		}
	}

	// Map nav item to JSON key
	const navKeyMap = {
		home: '00_shared-header-nav-home',
		about: '00_shared-header-nav-about',
		news: '00_shared-header-nav-news',
		events: '00_shared-header-nav-events',
		services: '00_shared-header-nav-services',
		partners: '00_shared-header-nav-partners',
		contact: '00_shared-header-nav-contact'
	};
</script>

<header id="header" class="nav-solid">
	<nav class="nav">
		<div class="nav-icons flex">
			<a href="/" class="nav-logo">
				<i class="carbon-language"></i>
				{$langData[navKeyMap['home']]}
			</a>

			<i class="nav-burger ri-menu-line" on:click={toggleMenu} class:show={!menuOpen}></i>
			<i class="nav-close ri-close-line" on:click={toggleMenu} class:show={menuOpen}></i>
		</div>

		<div class={`nav-menu ${menuOpen ? 'show-menu' : ''}`} id="nav-menu">
			<ul>
				{#each navItems as item}
					<li>
						<a href={`/${item}`}>
							{#if $langData[navKeyMap[item]]}
								{$langData[navKeyMap[item]]}
							{/if}
						</a>
					</li>
				{/each}

				<li id="nav-lan" class="dropdown">
					<a class="nav-link flex-container dropbtn">
						<i class={`flag-icon flag-icon-${currentFlag}`}></i>
						<i class="ri-arrow-down-s-fill"></i>
					</a>

					<div class="dropdown-content">
						<i class="nav-link flag-icon flag-icon-nl" on:click={loadNL}></i>
						<i class="nav-link flag-icon flag-icon-gb" on:click={loadEN}></i>
						<i class="nav-link flag-icon flag-icon-cn" on:click={loadCN}></i>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</header>
