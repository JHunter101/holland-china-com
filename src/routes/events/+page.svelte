<script lang="ts">
	import { onMount } from 'svelte';
	import PostEvent from '$lib/components/PostEvent.svelte';
	import type { EventPost } from '$lib/models/event';
	import { langData } from '$lib/stores';

	type EventMeta = { id: string; eventStart: string; dateLaunch: string };

	let upcomingIndex: EventMeta[] = [];
	let pastIndex: EventMeta[] = [];

	let upcomingEvents: EventPost[] = [];
	let pastEvents: EventPost[] = [];

	const pageSize = 5;

	let upcomingPage = 1;
	let pastPage = 1;

	let upcomingTotalPages = 1;
	let pastTotalPages = 1;

	let loadingUpcoming = true;
	let loadingPast = true;

	async function loadIndex() {
		const res = await fetch('/posts/events/index.json');
		if (!res.ok) throw new Error('Failed to load events index');
		const data: EventMeta[] = await res.json();

		const now = new Date();

		upcomingIndex = data.filter((e) => new Date(e.eventStart) >= now);
		pastIndex = data.filter((e) => new Date(e.eventStart) < now);

		upcomingTotalPages = Math.ceil(upcomingIndex.length / pageSize);
		pastTotalPages = Math.ceil(pastIndex.length / pageSize);
	}

	async function loadPage(indexSlice: EventMeta[]) {
		const promises = indexSlice.map(async (meta) => {
			const res = await fetch(`/posts/events/${meta.id}.json`);
			const data = await res.json();

			data.eventStart = new Date(data.eventStart);
			data.eventEnd = new Date(data.eventEnd);
			data.dateLaunch = new Date(data.dateLaunch);

			return data as EventPost;
		});
		return Promise.all(promises);
	}

	async function loadUpcomingPage(pageNum: number) {
		loadingUpcoming = true;
		const start = (pageNum - 1) * pageSize;
		const end = start + pageSize;
		upcomingEvents = await loadPage(upcomingIndex.slice(start, end));
		loadingUpcoming = false;
	}

	async function loadPastPage(pageNum: number) {
		loadingPast = true;
		const start = (pageNum - 1) * pageSize;
		const end = start + pageSize;
		pastEvents = await loadPage(pastIndex.slice(start, end));
		loadingPast = false;
	}

	function nextUpcoming() {
		if (upcomingPage < upcomingTotalPages) {
			upcomingPage++;
			loadUpcomingPage(upcomingPage);
		}
	}

	function prevUpcoming() {
		if (upcomingPage > 1) {
			upcomingPage--;
			loadUpcomingPage(upcomingPage);
		}
	}

	function nextPast() {
		if (pastPage < pastTotalPages) {
			pastPage++;
			loadPastPage(pastPage);
		}
	}

	function prevPast() {
		if (pastPage > 1) {
			pastPage--;
			loadPastPage(pastPage);
		}
	}

	onMount(async () => {
		await loadIndex();
		await loadUpcomingPage(upcomingPage);
		await loadPastPage(pastPage);
	});
</script>

<section class="screen-tuck flex-col">
	<h2 class="subtitle text-large text-alt">
		{$langData['00_shared_events-section-title-upcoming_events']}
	</h2>
	{#if loadingUpcoming}
		<p>Loading upcoming events...</p>
	{:else if upcomingEvents.length}
		{#each upcomingEvents as post (post.id)}
			<PostEvent {post} />
		{/each}
		<div class="pagination">
			<button on:click={prevUpcoming} disabled={upcomingPage === 1}>Previous</button>
			<span>Page {upcomingPage} of {upcomingTotalPages}</span>
			<button on:click={nextUpcoming} disabled={upcomingPage === upcomingTotalPages}>Next</button>
		</div>
	{:else}
		<p>No upcoming events.</p>
	{/if}
</section>

<section class="screen-tuck flex-col">
	<h2 class="subtitle text-large text-alt">
		{$langData['00_shared_events-section-title-past_events']}
	</h2>
	{#if loadingPast}
		<p>Loading past events...</p>
	{:else if pastEvents.length}
		{#each pastEvents as post (post.id)}
			<PostEvent {post} />
		{/each}
		<div class="pagination">
			<button on:click={prevPast} disabled={pastPage === 1}>Previous</button>
			<span>Page {pastPage} of {pastTotalPages}</span>
			<button on:click={nextPast} disabled={pastPage === pastTotalPages}>Next</button>
		</div>
	{:else}
		<p>No past events.</p>
	{/if}
</section>

<style>
	:global(.post-ps) {
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

	button[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
