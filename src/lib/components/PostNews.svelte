<script lang="ts">
	import { currentLang } from '$lib/stores';
	import type { NewsPost } from '$lib/models/news';
	import { derived } from 'svelte/store';
	export let post: NewsPost;

	const displayTitle = derived(
		currentLang,
		($currentLang) => post.titles[$currentLang as keyof typeof post.titles] || post.titles.EN
	);
	const displayContent = derived(
		currentLang,
		($currentLang) => post.contents[$currentLang as keyof typeof post.contents] || post.contents.EN
	);

	const pinnedLabel = derived(currentLang, ($currentLang) => {
		if ($currentLang === 'NL') return 'Uitgelicht';
		if ($currentLang === 'CN') return '置顶帖子';
		return 'Pinned';
	});
</script>

{#if post.isPinned}
	<div class="pinned-banner">
		<i class="ri-pushpin-line"></i>
		<span>{$pinnedLabel}</span>
	</div>
{/if}
<div class="post-news flex-responsive flex-gap-large w100">
	<div class="post-text flex-item-2">
		<a class="header text-medium" href={`post.html?pid=${post.id}`}>
			{$displayTitle}
		</a>
		<div class="subheader text-small post-data flex-row">
			<h3>
				Posted by Xu Xiao Jia on
				{post.dateLaunch.toLocaleDateString(
					$currentLang === 'NL' ? 'nl' : $currentLang === 'CN' ? 'zh-CN' : 'en'
				)}
			</h3>
		</div>
		<div class="post-ps">
			<p>{$displayContent}</p>
		</div>
		<a class="read-more" href={`post.html?pid=${post.id}`}>Read more</a>
	</div>

	<div class="flex-item-2 post-image">
		<img
			src={post.images[0].startsWith('https') ? post.images[0] : `res/${post.id}/${post.images[0]}`}
			alt={$displayTitle}
		/>
	</div>
</div>

<style>
	.pinned-banner,
	.pinned-banner * {
		color: rgb(var(--color-accent-alt));
	}

	.pinned-banner {
		background-color: rgba(var(--color-accent-alt), 0.05);
		border-bottom: 1px solid rgb(var(--color-accent-alt));
		padding: min(1vh, 0.25rem) min(3vw, 1rem);
		display: flex;
		width: 100%;
		gap: 0.5rem;
	}

	.pinned-banner span {
		margin: 0;
	}
</style>
