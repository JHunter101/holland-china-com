<script lang="ts">
	import { langData } from '../stores';
	import { derived } from 'svelte/store';

	const heroPrefix = 'HCC_00_home';

	const heroTitle = derived(langData, ($langData) => $langData[`${heroPrefix}-hero-header-`] || '');

	const bannerPoints = derived(langData, ($langData) => {
		const points = [];
		let i = 1;
		while ($langData[`HCC_00_home-hero-li-${i}`]) {
			points.push($langData[`HCC_00_home-hero-li-${i}`]);
			i++;
		}
		return points;
	});
</script>

<section class="section-accent fit-height overlay fullscreen-image">
	<img src="https://placehold.co/600x400" alt="Event Sample" />

	<div class="w100 screen-tuck-tight">
		<div class="hero-box flex-col">
			<h1 class="header text-large slide-down-1 text-center">
				{$heroTitle}
			</h1>

			<ul>
				{#each $bannerPoints as point, i}
					<li class={`text-small slide-down-${i + 2}`}>{point}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.hero-box {
		background-color: rgba(190, 19, 45, 0.85);
		border-radius: min(2vh, 0.5rem);
		padding: min(12vh, 3rem) min(12vw, 4rem);
	}
</style>
