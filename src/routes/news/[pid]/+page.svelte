<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import PostNews from '$lib/components/PostNews.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import type { NewsPost } from '$lib/models/news.ts';
	import { langData } from '$lib/stores';

	let post: NewsPost | null = null;

	async function loadNews(pid: string): Promise<void> {
		try {
			const res = await fetch(`/posts/news/${pid}.json`);
			if (!res.ok) throw new Error(`Failed to fetch posts/news/${pid}.json`);
			const data = await res.json();

			data.dateLaunch = new Date(data.dateLaunch);

			// Ensure images exist
			if (!data.images || data.images.length === 0) {
				data.images = [
					'https://placehold.co/600x400',
					'https://placehold.co/600x400',
					'https://placehold.co/600x400',
					'https://placehold.co/600x400'
				];
			}

			post = data;
		} catch (err) {
			console.error('Failed to load news for pid:', pid, err);
		}
	}

	onMount(() => {
		const pid = get(page).params.pid;
		if (pid) loadNews(pid);
		else console.error('No pid found in URL params');
	});
</script>

<section id="news-this" class="screen-tuck flex-natural flex-gap-large">
	{#if post}
		<PostNews {post} />
		<!-- Image Carousel Component -->
		<ImageCarousel images={post.images} />
	{:else}
		<p>Loading news...</p>
	{/if}
</section>

<style>
	:global(#news-this .post-news) {
		white-space: pre-line;
		flex-direction: column-reverse;
		gap: min(4vh, 1rem);
		padding: 0 0 min(4vh, 1rem) 0;
	}

	:global(#news-this .post-news img) {
		aspect-ratio: 21/9;
	}

	:global(#news-this .read-more) {
		display: none;
	}
</style>
