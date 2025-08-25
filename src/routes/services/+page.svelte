<script lang="ts">
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';

	const services = derived(langData, ($langData) => {
		const list = [];
		let i = 1;
		while ($langData[`HCC_04_services-service-header-${i}`]) {
			const titleKey = `HCC_04_services-service-header-${i}`;
			const points = [];
			let j = 1;
			while ($langData[`HCC_04_services-service-li-${i}_${j}`]) {
				points.push($langData[`HCC_04_services-service-li-${i}_${j}`]);
				j++;
			}
			list.push({
				title: $langData[titleKey],
				points,
				description: $langData[titleKey] || ''
			});
			i++;
		}
		return list;
	});

	let openService: number | null = null;
	const toggleService = (index: number) => {
		openService = openService === index ? null : index;
	};
</script>

<section class="screen-tuck flex-natural text--justify flex-col">
	<h1 class="subtitle text-large">
		{$langData['00_shared-header-nav-services'] || 'Our Services'}
	</h1>
	<p>{$langData['HCC_04_services-main-desc-1']}</p>
	<p>
		{$langData['HCC_04_services-main-desc-2']}
	</p>

	<div id="services-grid" class="grid-nest flex-gap-small">
		{#each $services as service, index}
			<div class="card" on:click={() => toggleService(index)}>
				<div class="">
					<h2 class="subheader text-medium">{service.title}</h2>
					<ul>
						{#each service.points as point}
							<li><p class="text-small">{point}</p></li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	#services-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 1200px) {
		#services-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 768px) {
		#services-grid {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}
</style>
