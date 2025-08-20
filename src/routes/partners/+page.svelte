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
			img: $langData[`partners-${i}-img`] || 'https://placehold.co/400x400'
		}))
	);
</script>

<section class="screen-tuck flex-natural flex-gap section text--justify flex-col">
	<h1 class="subtitle text-large">{$langData['partners-main-title'] || 'Our Partners'}</h1>
	<p>
		{$langData['partners-main-text'] ||
			'We work closely with these esteemed partners to deliver the best services.'}
	</p>
</section>

<!-- Partners Grid Section -->
<section class="screen-tuck flex-natural flex-gap section flex-col">
	<h2 class="subtitle text-large text-center">
		{$langData['partners-grid-title'] || 'Meet Our Partners'}
	</h2>
	<div id="partners-grid" class="grid-nest flex-gap--small">
		{#each $partners as partner}
			<div class="border--light card">
				<div class="about-image">
					<img src={partner.img} alt={partner.name} class="card-img" />
				</div>
				<div class="card-content text-center">
					<h3 class="header text-medium">{partner.name}</h3>
					<p class="text-small">{partner.bio}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.grid-nest {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
	.card-img {
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 0.5rem;
	}
	.card {
		background: var(--card-bg, #fff);
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: var(--card-shadow, 0 2px 5px rgba(0, 0, 0, 0.1));
		cursor: default;
		transition: transform 0.2s ease;
	}
	.card:hover {
		transform: translateY(-3px);
	}
</style>
