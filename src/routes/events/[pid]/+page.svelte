<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import PostEvent from '$lib/components/PostEvent.svelte';
	import type { EventPost } from '$lib/models/event.ts';

	let post: EventPost | null = null;

	async function loadEvent(pid: string): Promise<void> {
		try {
			const res = await fetch(`/posts/events/${pid}.json`);
			if (!res.ok) throw new Error(`Failed to fetch posts/events/${pid}.json`);
			const data = await res.json();

			data.eventStart = new Date(data.eventStart);
			data.eventEnd = new Date(data.eventEnd);
			data.dateLaunch = new Date(data.dateLaunch);

			post = data;
		} catch (err) {
			console.error('Failed to load event for pid:', pid, err);
		}
	}

	onMount(() => {
		const pid = get(page).params.pid;
		if (pid) {
			loadEvent(pid);
		} else {
			console.error('No pid found in URL params');
		}
	});
</script>

<section class="screen-tuck flex-natural flex-gap-small">
	{#if post}
		<PostEvent {post} />
	{:else}
		<p>Loading event...</p>
	{/if}
</section>

<style>
	:global(.post-event) {
		flex-direction: column;
		gap: min(4vh, 1rem);
	}

	:global(.read-more) {
		display: none;
	}

	:global(.event-date) {
		display: none;
	}
</style>
