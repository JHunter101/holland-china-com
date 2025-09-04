<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import PostEvent from '$lib/components/PostEvent.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import type { EventPost } from '$lib/models/event.ts';
	import { langData } from '$lib/stores';

	let post: EventPost | null = null;

	async function loadEvent(pid: string): Promise<void> {
		try {
			const res = await fetch(`/posts/events/${pid}.json`);
			if (!res.ok) throw new Error(`Failed to fetch posts/events/${pid}.json`);
			const data = await res.json();

			data.eventStart = new Date(data.eventStart);
			data.eventEnd = new Date(data.eventEnd);
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
			console.error('Failed to load event for pid:', pid, err);
		}
	}

	function formatDate(date: Date) {
		return date.toLocaleString(undefined, {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function shareUrl(platform: string) {
		if (!post) return '#';
		const url = encodeURIComponent(window.location.href);
		const title = encodeURIComponent(post.titles['EN'] || 'Check this event');

		switch (platform) {
			case 'twitter':
				return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
			case 'facebook':
				return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
			case 'linkedin':
				return `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`;
			default:
				return '#';
		}
	}

	function calendarLinks() {
		if (!post) return { google: '#', outlook: '#', ical: '#' };

		const title = encodeURIComponent(post.titles['EN'] || 'Event');
		const details = encodeURIComponent(post.contents['EN'] || '');
		const location = encodeURIComponent(
			`${post.location.name}, ${post.location.streetName} ${post.location.streetNumber}, ${post.location.city}`
		);
		const start = post.eventStart.toISOString().replace(/-|:|\.\d\d\d/g, '');
		const end = post.eventEnd.toISOString().replace(/-|:|\.\d\d\d/g, '');

		return {
			google: `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`,
			outlook: `https://outlook.office.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&startdt=${post.eventStart.toISOString()}&enddt=${post.eventEnd.toISOString()}&location=${location}`,
			ical: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR VERSION:2.0 BEGIN:VEVENT SUMMARY:${title} DESCRIPTION:${details} DTSTART:${start} DTEND:${end} LOCATION:${location} END:VEVENT END:VCALENDAR`
		};
	}

	onMount(() => {
		const pid = get(page).params.pid;
		if (pid) loadEvent(pid);
		else console.error('No pid found in URL params');
	});

	$: street = post
		? [post.location.streetName, post.location.streetNumber].filter(Boolean).join(' ')
		: '';

	$: cityLine = post
		? [post.location.postalCode, post.location.city].filter(Boolean).join(' ')
		: '';

	$: addressLine = post ? [street, cityLine, post.location.country].filter(Boolean).join(', ') : '';
</script>

<section id="event-this" class="screen-tuck flex-natural flex-gap-large">
	{#if post}
		<PostEvent {post} />

		<div class="event-details-grid">
			<div class="detail card">
				<span class="icon">
					<!-- Calendar SVG -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z"
						/>
					</svg>
				</span>
				<div>{formatDate(post.eventStart)}</div>
			</div>
			<div class="detail card">
				<span class="icon">
					<!-- Clock SVG -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm1 12.59V7h-2v7h6v-2h-4z" />
					</svg>
				</span>
				<div>{formatDate(post.eventEnd)}</div>
			</div>
			<div class="detail card">
				<span class="icon">
					<!-- Location SVG -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5z"
						/>
					</svg>
				</span>
				<div>
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
			</div>
			{#if post.linkSignUp}
				<div class="detail card">
					<span class="icon">
						<!-- Pencil / Sign Up SVG -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
							/>
						</svg>
					</span>
					<div>
						<a
							href={post.linkSignUp.includes('@')
								? `mailto:${post.linkSignUp}`
								: post.linkSignUp.startsWith('http')
									? post.linkSignUp
									: `https://${post.linkSignUp}`}
							target={post.linkSignUp.includes('@') ? undefined : '_blank'}
							rel={post.linkSignUp.includes('@') ? undefined : 'noopener noreferrer'}
						>
							{$langData['00_shared-events-span-register_now']}
						</a>
					</div>
				</div>
			{/if}
			<div class="detail card calendar">
				<span class="icon">
					<!-- Calendar + SVG icon for calendar links -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z"
						/>
					</svg>
				</span>
				<div>
					<a href={calendarLinks().google} target="_blank" rel="noopener">Google</a>
					<a href={calendarLinks().outlook} target="_blank" rel="noopener">Outlook</a>
					<a href={calendarLinks().ical} download={`${post.titles['EN'] || 'event'}.ics`}>iCal</a>
				</div>
			</div>
			<div class="detail card">
				<span class="icon">
					<!-- Share / Social SVG -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.048 3.048 0 0 0 0-1.4l7.05-4.11a2.99 2.99 0 1 0-.91-1.79L8 9.5a2.99 2.99 0 1 0 0 5l7.13 4.15c.47.47 1.15.77 1.87.77a2.99 2.99 0 1 0 0-5.94z"
						/>
					</svg>
				</span>
				<div>
					<a href={shareUrl('twitter')} target="_blank" rel="noopener">Twitter</a>
					<a href={shareUrl('facebook')} target="_blank" rel="noopener">Facebook</a>
					<a href={shareUrl('linkedin')} target="_blank" rel="noopener">LinkedIn</a>
				</div>
			</div>
		</div>

		<!-- Image Carousel Component -->
		<ImageCarousel images={post.images} />
	{:else}
		<p>Loading event...</p>
	{/if}
</section>

<style>
	:global(#event-this .post-event) {
		white-space: pre-line;
		flex-direction: column-reverse;
		gap: min(4vh, 1rem);
		padding: 0 0 min(4vh, 1rem) 0;
	}

	:global(#event-this .post-event img) {
		aspect-ratio: 21/9;
	}

	:global(#event-this .read-more) {
		display: none;
	}

	:global(#event-this .event-date) {
		display: none;
	}

	.event-details-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: min(4vh, 1rem);
		background: rgb(var(--color-bg-alt));
		padding: min(4vh, 1rem);
		border-radius: min(1vh, 0.25rem);
	}

	@media (max-width: 1200px) {
		.event-details-grid {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}

	.event-details-grid .detail {
		display: flex;
		align-items: center;
		gap: min(4vh, 1rem);
		background: rgb(var(--color-bg-main));
	}

	.event-details-grid .detail .icon {
		font-size: 2rem;
		margin: 0;
	}

	.event-details-grid a {
		margin-right: 0.5rem;
		text-decoration: underline;
	}
</style>
