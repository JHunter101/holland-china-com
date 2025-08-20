<script lang="ts">
	import { langData } from '../stores';
	import { derived } from 'svelte/store';

	const bannerPoints = derived(langData, ($langData) =>
		Array.from({ length: 8 }, (_, i) => $langData[`home-banner-points-${i}`]).filter(Boolean)
	);
</script>

<section class="section-accent fit-height overlay fullscreen-image">
	<img src="https://placehold.co/600x400" alt="Event Sample" />

	<div class="w100 screen-tuck-tight">
		<div class="hero-box flex-col">
			<h1 class="header text-large slide-down-1 text-center">
				{$langData['home-hero-title']}
			</h1>

			<ul>
				{#each $bannerPoints as point, i}
					<li class={`text-small slide-down-${i + 2}`}>{point}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
