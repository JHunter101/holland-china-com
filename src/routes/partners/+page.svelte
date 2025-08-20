<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';

	// Partners store (dynamic from langData)
	const partners = derived(langData, ($langData) =>
		Array.from({ length: 6 }, (_, i) => ({
			name: $langData[`partners-${i}-name`] || `Partner ${i + 1}`,
			bio: $langData[`partners-${i}-bio`] || 'Short description goes here.',
			img: $langData[`partners-${i}-img`] || 'https://placehold.co/400x200'
		}))
	);
</script>

<section class="screen-tuck flex-natural text--justify flex-col">
	<h1 class="subtitle text-large">{$langData['partners-main-title'] || 'Our Partners'}</h1>
	<p>
		{$langData['partners-main-text'] ||
			'We work closely with these esteemed partners to deliver the best services.'}
	</p>
</section>

<!-- Partners Grid Section -->
<section class="screen-tuck flex-natural">
	<div id="partners-grid" class="grid-nest flex-gap-small">
		{#each $partners as partner}
			<div class="card flex-col">
				<div class="about-image">
					<img src={partner.img} alt={partner.name} class="card-img" />
				</div>
				<div class="text-center">
					<h3 class="subheader text-medium">{partner.name}</h3>
					<p class="text-small">{partner.bio}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	#partners-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0;
	}

	@media (max-width: 1200px) {
		#partners-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
