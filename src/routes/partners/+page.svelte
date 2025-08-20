<script lang="ts">
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';

	const partners = derived(langData, ($langData) => {
		const list = [];
		let i = 1;
		while ($langData[`HCC_05_partners-partner--${i}`]) {
			list.push({
				name: $langData[`HCC_05_partners-partner--${i}`],
				img: `res/partners/${i}.jpeg`, // adjust path if needed
				bio: $langData[`partners-${i}-bio`] || '' // optional
			});
			i++;
		}
		return list;
	});
</script>

<section class="screen-tuck flex-natural text--justify flex-col">
	<h1 class="subtitle text-large">
		{$langData['00_shared-footer-header-our_partners'] || 'Our Partners'}
	</h1>
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
					{#if partner.bio}
						<p class="text-small">{partner.bio}</p>
					{/if}
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

	#partners-grid img {
		object-fit: contain;
		aspect-ratio: 4 / 2;
	}

	@media (max-width: 1200px) {
		#partners-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
