<script lang="ts">
	import type { EventPost } from '$lib/models/event';
	import { currentLang } from '$lib/stores';
	import { derived } from 'svelte/store';

	export let post: EventPost;

	const langCode = derived(currentLang, ($currentLang) => $currentLang);
</script>

<div class="event-date flex-col">
	<div class="event-cal-top flex-col">
		<p class="header text-medium text-center">{post.eventStart.getFullYear()}</p>
	</div>
	<div class="event-cal-bot flex-col">
		<p class="header text-large text-center">
			{post.eventStart.toLocaleString($currentLang, { month: 'short' }).toUpperCase()}
		</p>
		<p class="header text-large text-center">{post.eventStart.getDate()}</p>
	</div>
</div>

<style>
	.event-date {
		border: 2px solid #ddd;
		border-radius: min(3vw, 1rem);
	}

	.event-cal-top {
		background-color: rgb(var(--color-accent-alt));
		border-bottom: 1px solid #ddd;
		border-radius: min(3vw, 1rem) min(3vw, 1rem) 0 0;
		padding: min(0.25vh, 0.0625rem) min(6vw, 2rem);
		width: 100%;
		text-transform: uppercase;
	}

	.event-cal-top p {
		color: rgb(var(--color-bg-main));
	}

	.event-cal-bot {
		border-top: 1px solid #ddd;
		border-radius: 0 0 min(3vw, 1rem) min(3vw, 1rem);
		padding: min(2vh, 0.5rem) min(7.5vw, 2.5rem);
		width: 100%;
	}

	.event-cal-top p,
	.event-cal-bot p {
		margin: 0;
		background: transparent;
	}

	@media (max-width: 1200px) {
		.event-date,
		.event-cal-bot,
		.event-cal-top {
			width: 100%;
			border-radius: 0;
		}
	}
</style>
