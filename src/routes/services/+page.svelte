<script lang="ts">
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';

	// Services section (dynamic from langData)
	const services = derived(langData, ($langData) =>
		Array.from({ length: 6 }, (_, i) => ({
			title: $langData[`services-${i}-title`] || `Service ${i + 1}`,
			description:
				$langData[`services-${i}-description`] ||
				'This service helps clients achieve their goals with reliable, efficient, and professional solutions.',
			points: Object.values(
				$langData[`services-${i}-points`] || {
					0: 'High-quality and reliable',
					1: 'Tailored to client needs',
					2: 'Delivered with professionalism'
				}
			),
			icon: $langData[`services-${i}-icon`] || '⚙️'
		}))
	);

	let openService: number | null = null;
	const toggleService = (index: number) => {
		openService = openService === index ? null : index;
	};
</script>

<section class="screen-tuck flex-natural text--justify flex-col">
	<h1 class="subtitle text-large">{$langData['services-main-title'] || 'Our Services'}</h1>
	<p>
		{$langData['services-main-text'] ||
			'We provide a wide range of services designed to support our clients with expertise, reliability, and innovation.'}
	</p>
	<div id="services-grid" class="grid-nest flex-gap-small">
		{#each $services as service, index}
			<div class="card" on:click={() => toggleService(index)}>
				<div class="">
					<h3 class="subheader text-medium">{service.title}</h3>
					<p class="text-small">{service.description}</p>
					<ul>
						{#each service.points as point}
							<li>
								<p class="text-small">{point}</p>
							</li>
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
</style>
