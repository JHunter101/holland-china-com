<script lang="ts">
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';

	// Principles section
	const principles = derived(langData, ($langData) =>
		['Precision', 'Direct', 'Loyalty', 'Philosophy', 'Professionalism'].map((key) => ({
			title: $langData[`about-principles-${key}-title`] || key,
			points: Object.values($langData[`about-principles-${key}-points`] || {})
		}))
	);

	// Team members
	const teamMembers = derived(langData, ($langData) =>
		Array.from({ length: 4 }, (_, i) => ({
			name: $langData[`about-team-${i}-name`] || `Team Member ${i + 1}`,
			role: $langData[`about-team-${i}-role`] || 'Role Placeholder',
			bio: $langData[`about-team-${i}-bio`] || 'Short bio goes here.',
			img: $langData[`about-team-${i}-img`] || 'https://placehold.co/400x400'
		}))
	);

	let openMember: number | null = null;
	const toggleMember = (index: number) => {
		openMember = openMember === index ? null : index;
	};
</script>

<section class="screen-tuck flex-natural flex-gap section text--justify flex-col">
	<h1 class="subtitle text-large">{$langData['about-main-title'] || 'About Us'}</h1>
	<p>
		{$langData['about-main-text'] || 'Main text describing the company goes here.'}
	</p>
</section>

<section class="screen-tuck flex-natural flex-gap section flex-col">
	{#each $principles as principle}
		<div class="flex-gap-small flex-col">
			<h3 class="subtitle text-standard">{principle.title}:</h3>
			<ul>
				{#each principle.points as point}
					<li>{point}</li>
				{/each}
			</ul>
		</div>
	{/each}
</section>

<section class="screen-tuck flex-natural flex-gap section flex-col">
	<h1 class="subtitle text-large">{$langData['about-team-title'] || 'Our Team'}</h1>
	<div id="about-team-grid" class="grid-nest flex-gap-small">
		{#each $teamMembers as member, index}
			<div class="border-light" on:click={() => toggleMember(index)}>
				{#if openMember !== index}
					<div class="about-image">
						<img src={member.img} alt={member.name} class="card-img" />
					</div>
				{/if}
				<div class="card-content text-center">
					<h3 class="header text-standard">{member.name}</h3>
					<p class="subheader text-small">{member.role}</p>
					{#if openMember === index}
						<p class="text-small">{member.bio}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	#about .team-member {
		min-height: min(36vh, 9rem);
	}

	#about-team-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	#about-team-grid > * {
		grid-template-rows: unset;
		cursor: pointer;
	}

	#about-team-grid > *:hover {
		background-color: #f5f5f5;
	}

	#about-team-grid > * > *:nth-child(2) {
		padding: min(4vh, 1rem) 0;
	}

	#about-team-grid > * > *:first-child {
		margin-left: auto;
		margin-right: auto;
	}

	#about-team-grid > * > *:first-child,
	#about-team-grid > * > *:last-child {
		height: min(48vh, 12rem);
	}

	#about-team-grid img {
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		-o-object-fit: contain;
		object-fit: contain;
	}

	@media (max-width: 1200px) {
		#about-team-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
