<script lang="ts">
	import { onMount } from 'svelte';
	import PostEvent from '$lib/components/PostEvent.svelte';
	import PostNews from '$lib/components/PostNews.svelte';
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';
	import type { EventPost } from '$lib/models/event';
	import type { NewsPost } from '$lib/models/news';
	import { loadFirstUpcomingEvent, loadLatestNews } from '$lib/services/loadPosts';

	const heroPrefix = 'HCC_00_home';
	const heroTitle = derived(
		langData,
		($langData) => $langData[`${heroPrefix}-hero-header-1`] || ''
	);
	const bannerPoints = derived(langData, ($langData) => {
		const points: string[] = [];
		let i = 1;
		while ($langData[`HCC_00_home-hero-li-${i}`]) {
			points.push($langData[`HCC_00_home-hero-li-${i}`]);
			i++;
		}
		return points;
	});

	let highlightEvent: EventPost | null = null;
	let highlightNews: NewsPost[] = [];

	onMount(async () => {
		highlightEvent = await loadFirstUpcomingEvent();
		console.log('Loaded event:', highlightEvent);

		highlightNews = await loadLatestNews(3);
		console.log('Loaded news:', highlightNews);
	});
</script>

<section class="section-accent fit-height overlay fullscreen-image">
	<img src="img/home/hcc_home_hero.png" alt="Event Sample" />

	<div class="w100 screen-tuck-tight">
		<div class="hero-box flex-col">
			<h1 class="header text-large slide-down-1 text-center">{$heroTitle}</h1>
			<ul>
				{#each $bannerPoints as point, i}
					<li class={`text-small slide-down-${i + 2}`}>{point}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

{#if highlightEvent}
	<section id="home-event" class="screen-tuck flex-col">
		<h2 class="subtitle text-large text-alt">Featured Event</h2>
		<PostEvent post={highlightEvent} />
	</section>
{/if}

{#if highlightNews.length}
	<section id="home-news" class="screen-tuck flex-col">
		<h2 class="subtitle text-large text-alt">Latest News</h2>
		{#each highlightNews as post (post.id)}
			<PostNews {post} />
		{/each}
	</section>
{/if}

<style>
	.hero-box {
		background-color: rgba(190, 19, 45, 0.85);
		border-radius: min(2vh, 0.5rem);
		padding: min(12vh, 3rem) min(12vw, 4rem);
	}

	.slide-down-1 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 1s forwards;
		animation: slideDown 1s forwards;
	}

	.slide-down-2 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 2s forwards;
		animation: slideDown 2s forwards;
	}

	.slide-down-3 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 3s forwards;
		animation: slideDown 3s forwards;
	}

	.slide-down-4 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 4s forwards;
		animation: slideDown 4s forwards;
	}

	.slide-down-5 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 5s forwards;
		animation: slideDown 5s forwards;
	}

	.slide-down-6 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 6s forwards;
		animation: slideDown 6s forwards;
	}

	.slide-down-7 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 7s forwards;
		animation: slideDown 7s forwards;
	}

	.slide-down-8 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 8s forwards;
		animation: slideDown 8s forwards;
	}

	.slide-down-9 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 9s forwards;
		animation: slideDown 9s forwards;
	}

	.slide-down-10 {
		position: relative;
		top: -100px;
		-webkit-animation: slideDown 10s forwards;
		animation: slideDown 10s forwards;
	}

	@-webkit-keyframes slideDown {
		0% {
			opacity: 0;
		}

		75% {
			opacity: 0;
		}

		100% {
			top: 0;
		}
	}

	@keyframes slideDown {
		0% {
			opacity: 0;
		}

		75% {
			opacity: 0;
		}

		100% {
			top: 0;
		}
	}

	:global(#home-news .post-ps),
	:global(#home-event .post-ps) {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		margin-bottom: min(4vh, 1rem);
	}
</style>
