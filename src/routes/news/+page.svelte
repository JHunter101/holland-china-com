<script lang="ts">
	import { onMount } from 'svelte';
	import PostNews from '$lib/components/PostNews.svelte';
	import { page as pageStore } from '$app/stores';
	import { goto } from '$app/navigation';
	import { langData } from '$lib/stores';
	import type { NewsPost } from '$lib/models/news';
	import { loadNewsPosts } from '$lib/services/loadPosts';

	const pageSize = 5;
	let page = 1;
	let totalPages = 1;
	let newsPosts: NewsPost[] = [];
	let loading = true;

	function updateSearchParams() {
		const params = new URLSearchParams($pageStore.url.searchParams);
		params.set('page', String(page));
		goto(`${$pageStore.url.pathname}?${params.toString()}`, { replaceState: true, noScroll: true });
	}

	async function loadPage() {
		loading = true;
		newsPosts = await loadNewsPosts(page, pageSize);
		loading = false;
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

<section id="news" class="screen-tuck flex-col">
	<h2 class="subtitle text-large text-alt">{$langData['00_shared-header-nav-news']}</h2>
	{#if loading}
		<p>Loading news...</p>
	{:else if newsPosts.length}
		{#each newsPosts as post (post.id)}
			<PostNews {post} />
		{/each}
	{:else}
		<p>{$langData['00_shared-news-subheader-no-recent-found']}</p>
	{/if}

	<div class="pagination">
		<button on:click={() => changePage(page - 1)} disabled={page === 1}
			>{$langData['00_shared-pagination-span-previous']}</button
		>
		<span>{$langData['00_shared-pagination-span-page']} {page} / {totalPages}</span>
		<button on:click={() => changePage(page + 1)} disabled={page === totalPages}
			>{$langData['00_shared-pagination-span-next']}</button
		>
	</div>
</section>

<style>
	:global(#news .post-ps) {
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
