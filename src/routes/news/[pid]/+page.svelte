<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import PostNews from '$lib/components/PostNews.svelte';
	import type { NewsPost } from '$lib/models/news.ts';
	import { base } from '$app/paths';

	let post: NewsPost | null = null;

	async function loadNews(pid: string): Promise<void> {
		try {
			const res = await fetch(`/posts/events/${pid}.json`);
			if (!res.ok) throw new Error(`Failed to fetch posts/news/${pid}.json`);
			post = await res.json();
		} catch (err) {
			console.error('Failed to load news for pid:', pid, err);
		}
	}

	onMount(() => {
		const pid = get(page).params.pid;
		if (pid) {
			loadNews(pid);
		} else {
			console.error('No pid found in URL params');
		}
	});
</script>

{#if post}
	<PostNews {post} />
{:else}
	<p>Loading news...</p>
{/if}
