<script lang="ts">
	import { currentLang } from '$lib/stores';
	import type { EventPost } from '$lib/models/event';
	import { derived } from 'svelte/store';
	import { langData } from '$lib/stores';
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

	$: street = [post.location.streetName, post.location.streetNumber].filter(Boolean).join(' ');
	$: cityLine = [post.location.postalCode, post.location.city].filter(Boolean).join(' ');
	$: addressLine = [street, cityLine, post.location.country].filter(Boolean).join(', ');
</script>

<div class="post-event flex-responsive-rev flex-gap-large w100">
	<div class="post-text flex-item-2">
		<a class="header text-medium" href={`/events/${post.id}`}>
			{$displayTitle}
		</a>

		<div class="subheader text-small post-data flex-col">
			{#if post.location.name || addressLine}
				<h3>
					<a
						href={'https://www.google.com/maps/search/?api=1&query=' +
							encodeURIComponent(`${post.location.name || ''} ${addressLine || ''}`)}
						target="_blank"
						rel="noopener noreferrer"
					>
						{post.location.name}{post.location.name && addressLine ? ': ' : ''}{addressLine}
					</a>
				</h3>
			{/if}
		</div>

		<div class="post-ps">
			<p>{$displayContent}</p>
		</div>
		<a class="read-more" href={`/events/${post.id}`}>
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

	<div class="flex-item-1 flex-center flex-col">
		<EventCalendar {post} />
	</div>
</div>
