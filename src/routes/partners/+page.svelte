<script lang="ts">
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';

	const partners = derived(langData, ($langData) => {
		const list = [];
		let i = 1;
		while ($langData[`HCC_05_partners-partner-title-${i}`]) {
			list.push({
				name: $langData[`HCC_05_partners-partner-title-${i}`],
				img: $langData[`HCC_05_partners-partner-img-${i}`]
					? `/img/partners/${$langData[`HCC_05_partners-partner-img-${i}`]}.webp`
					: 'https://placehold.co/400x200'
			});
			i++;
		}
		return list;
	});
</script>

<section class="screen-tuck flex-natural text--justify flex-col">
	<h1 class="subtitle text-large text-center">
		{$langData['00_shared-partners-header-our_partners']}
	</h1>
	<div id="partners-grid" class="grid-nest flex-gap-small">
		{#each $partners as partner}
			<div class="card flex-col">
				<div class="subheader about-image">
					<img src={partner.img} alt={partner.name} class="card-img" />
				</div>
				<div class="text-center">
					<h3 class="header text-standard">{partner.name}</h3>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	#partners-grid {
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 0;
	}

	#partners-grid img {
		object-fit: contain;
		aspect-ratio: 4 / 2;
	}

	@media (max-width: 1200px) {
		#partners-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
