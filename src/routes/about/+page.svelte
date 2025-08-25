<script lang="ts">
	import { langData } from '$lib/stores';
	import { derived } from 'svelte/store';

	const principles = derived(langData, ($langData) => {
		const list = [];
		let i = 1;
		while ($langData[`HCC_01_about-principle-header-${i}`]) {
			const points = [];
			let j = 1;
			while ($langData[`HCC_01_about-principle-li-${i}_${j}`]) {
				points.push($langData[`HCC_01_about-principle-li-${i}_${j}`]);
				j++;
			}
			list.push({
				title: $langData[`HCC_01_about-principle-header-${i}`],
				points
			});
			i++;
		}
		return list;
	});

	const teamMembers = derived(langData, ($langData) => {
		const list = [];
		let i = 1;
		while ($langData[`SEAN_01_about-team-member_name-${i}`]) {
			list.push({
				name: $langData[`SEAN_01_about-team-member_name-${i}`],
				role: $langData[`SEAN_01_about-team-member_role-${i}`] || '',
				bio: $langData[`SEAN_01_about-team-member_desc-${i}`] || '',
				img: $langData[`SEAN_01_about-team-member_img-${i}`]
					? `/img/team/${$langData[`SEAN_01_about-team-member_img-${i}`]}.webp`
					: 'https://placehold.co/400x400'
			});
			i++;
		}
		return list;
	});

	let openMember: number | null = null;
	const toggleMember = (index: number) => {
		openMember = openMember === index ? null : index;
	};
</script>

<!-- About Main Text -->
<section class="screen-tuck flex-natural text--justify flex-col">
	<h1 class="subtitle text-large">{$langData['00_shared_about_header_about_us'] || 'About Us'}</h1>
	<p>{$langData['HCC_01_about-main-desc-1']}</p>
	<p>{$langData['HCC_01_about-main-desc-2']}</p>
	<div class="flex-gap-small flex-col">
		{#each $principles as principle}
			<div>
				<h3 class="subtitle text-standard">{principle.title}:</h3>
				<ul>
					{#each principle.points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<!-- Team Members -->
<section class="screen-tuck flex-natural flex-col">
	<h1 class="subtitle text-large">{$langData['00_shared_about_header_our_team'] || 'Our Team'}</h1>
	<div id="about-team-grid" class="grid-nest flex-gap-small">
		{#each $teamMembers as member, index}
			<div class="card" on:click={() => toggleMember(index)}>
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
	#about-team-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	#about-team-grid > * {
		cursor: pointer;
		display: flex;
		flex-direction: column;
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
	#about-team-grid img {
		aspect-ratio: 1 / 1;
		border-radius: 50%;
	}

	@media (max-width: 1200px) {
		#about-team-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
