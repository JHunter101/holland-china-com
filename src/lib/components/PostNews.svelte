<script lang="ts">
	import { currentLang } from '$lib/stores';
	import type { NewsPost } from '$lib/models/news';
	import { derived } from 'svelte/store';
	import { langData } from '$lib/stores';
	export let post: NewsPost;

	const displayTitle = derived(
		currentLang,
		($currentLang) => post.titles[$currentLang as keyof typeof post.titles] || post.titles.EN
	);
	const displayContent = derived(
		currentLang,
		($currentLang) => post.contents[$currentLang as keyof typeof post.contents] || post.contents.EN
	);
</script>

<div class="post-news flex-responsive flex-gap-large w100">
	<div class="post-text flex-item-2">
		<a class="header text-medium" href={`/news/${post.id}`}>
			{$displayTitle}
		</a>
		<div class="subheader text-small post-data flex-row">
			<h3>
				{$langData['00_shared-news-subheader-posted_by']} Xu Xiao Jia {$langData[
					'00_shared-news-subheader-on'
				]}
				{new Date(post.dateLaunch).toLocaleDateString(
					$currentLang === 'NL' ? 'nl' : $currentLang === 'CN' ? 'zh-CN' : 'en'
				)}
			</h3>
		</div>
		<div class="post-ps">
			<p>{$displayContent}</p>
		</div>
		<a class="read-more" href={`/news/${post.id}`}>
			{$langData['00_shared-common-span-read_more']}</a
		>
	</div>

	{#if post.images && post.images.length > 0}
		<div class="flex-item-2 post-image">
			<img
				src={post.images[0].startsWith('https')
					? post.images[0]
					: `res/${post.id}/${post.images[0]}`}
				alt={$displayTitle}
			/>
		</div>
	{/if}
</div>
