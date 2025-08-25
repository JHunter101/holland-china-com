<script lang="ts">
	import { currentLang } from '$lib/stores';
	import type { EventPost } from '$lib/models/event';
	import { derived } from 'svelte/store';
	import EventCalendar from '$lib/components/EventCal.svelte';
	export let post: EventPost;

	const displayTitle = derived(
		currentLang,
		($currentLang) => post.titles[$currentLang as keyof typeof post.titles] || post.titles.EN
	);
	const displayContent = derived(
		currentLang,
		($currentLang) => post.contents[$currentLang as keyof typeof post.contents] || post.contents.EN
	);
</script>

<div class="post-event flex-responsive-rev flex-gap-large w100">
	<div class="post-text flex-item-2">
		<a class="header text-medium" href={`/events/${post.id}`}>
			{$displayTitle}
		</a>
		<div class="subheader text-small post-data flex-col">
			<h3>{post.location.name}</h3>
			<h3>
				{post.location.streetName}
				{post.location.streetNumber}, {post.location.postalCode}
				{post.location.city}, {post.location.country}
			</h3>
		</div>
		<div class="post-ps">
			<p>{$displayContent}</p>
		</div>
		<a class="read-more" href={`/events/${post.id}`}>Read more</a>
	</div>

	<div class="flex-item-2 post-image">
		<img
			src={post.images[0].startsWith('https') ? post.images[0] : `res/${post.id}/${post.images[0]}`}
			alt={$displayTitle}
		/>
	</div>

	<div class="flex-item-1 flex-center flex-col">
		<EventCalendar {post} />
	</div>
</div>
