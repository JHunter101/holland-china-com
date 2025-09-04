<script lang="ts">
	import { onMount } from 'svelte';
	import PostEvent from '$lib/components/PostEvent.svelte';
	import { page as pageStore } from '$app/stores';
	import { goto } from '$app/navigation';
	import { langData } from '$lib/stores';
	import type { EventPost } from '$lib/models/event';
	import { loadIndex, loadEventPosts } from '$lib/services/loadPosts';

	const pageSize = 5;
	let page = 1;
	let totalPages = 1;
	let upcomingEvents: EventPost[] = [];
	let pastEvents: EventPost[] = [];
	let loadingUpcoming = true;
	let loadingPast = true;

	function updateSearchParams() {
		const params = new URLSearchParams($pageStore.url.searchParams);
		params.set('page', String(page));
		goto(`${$pageStore.url.pathname}?${params.toString()}`, { replaceState: true, noScroll: true });
	}

	async function loadPage() {
		totalPages = Math.ceil((await loadIndex('events')).length / pageSize) || 1;
		loadingUpcoming = true;
		loadingPast = true;
		const events = await loadEventPosts(page, pageSize);
		const now = new Date();
		upcomingEvents = events.filter((e) => e.eventEnd >= now).reverse();
		loadingUpcoming = false;
		pastEvents = events.filter((e) => e.eventEnd < now);
		loadingPast = false;
	}

	function changePage(newPage: number) {
		if (newPage < 1) return;
		page = newPage;
		updateSearchParams();
		loadPage();
	}

	onMount(async () => {
		page = Number($pageStore.url.searchParams.get('page')) || 1;
		await loadPage();
	});
</script>

{#if !(upcomingEvents.length === 0 && page > 1)}
	<section id="events-past" class="screen-tuck flex-gap-small flex-col">
		<h2 class="subtitle text-large text-alt">
			{$langData['00_shared-events-header-upcoming_events']}
		</h2>
		{#if loadingUpcoming}
			<p>Loading upcoming events...</p>
		{:else if upcomingEvents.length}
			{#each upcomingEvents as post (post.id)}
				<PostEvent {post} />
			{/each}
		{:else}
			<p>{$langData['00_shared-events-subheader-no-upcoming-found']}</p>
		{/if}
	</section>
{/if}

<section id="events-future" class="screen-tuck flex-gap-small flex-col">
	<h2 class="subtitle text-large text-alt">
		{$langData['00_shared-events-header-past_events']}
	</h2>
	{#if loadingPast}
		<p>Loading past events...</p>
	{:else if pastEvents.length}
		{#each pastEvents as post (post.id)}
			<PostEvent {post} />
		{/each}
	{:else}
		<p>{$langData['00_shared-events-subheader-no-recent-found']}</p>
	{/if}

	<div class="pagination">
		<button on:click={() => changePage(page - 1)} disabled={page === 1}>Previous</button>
		<span>Page {page} of {totalPages}</span>
		<button on:click={() => changePage(page + 1)} disabled={page === totalPages}>Next</button>
	</div>
</section>

<style>
	:global(#events-past .post-ps),
	:global(#events-future .post-ps) {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		margin-bottom: min(4vh, 1rem);
	}
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}
</style>
