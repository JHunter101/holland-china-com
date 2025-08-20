<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import PostNews from '$lib/components/PostNews.svelte';
	import PostEvent from '$lib/components/PostEvent.svelte';
	import { EventPost, EventLocation } from '$lib/models/event';
	import { NewsPost } from '$lib/models/news';

	// Temporary sample event
	const sampleLocation: EventLocation = new EventLocation(
		'Concert Hall',
		'Main Street',
		'123A',
		'1000AA',
		'Amsterdam',
		'Netherlands'
	);

	let highlightEvent: EventPost = new EventPost(
		['Official site'],
		new Date('2025-07-20'),
		{
			EN: 'Summer Music Festival',
			NL: 'Zomer Muziekfestival',
			CN: '夏季音乐节'
		},
		{
			EN: 'Join us for an unforgettable music festival featuring top artists from around the world.',
			NL: 'Doe mee aan een onvergetelijk muziekfestival met topartiesten van over de hele wereld.',
			CN: '加入我们，享受难忘的音乐节，汇聚来自世界各地的顶级艺术家。'
		},
		['https://summerfest.com'],
		['https://placehold.co/600x400'],
		sampleLocation,
		new Date('2025-08-10T18:00:00'),
		new Date('2025-08-12T23:00:00'),
		'https://summerfest.com/signup'
	);

	// Temporary sample news posts
	let highlightNews: NewsPost[] = [
		new NewsPost(
			['News Agency'],
			new Date('2025-07-01'),
			{
				EN: 'New regulations in effect',
				NL: 'Nieuwe regelgeving van kracht',
				CN: '新法规生效'
			},
			{
				EN: 'The government has implemented new regulations effective from August 1.',
				NL: 'De overheid heeft nieuwe regelgeving ingevoerd die vanaf 1 augustus van kracht is.',
				CN: '政府已于8月1日起实施新法规。'
			},
			['https://newsagency.com/regulations'],
			['https://placehold.co/600x400'],
			true
		),
		new NewsPost(
			['Local Reporter'],
			new Date('2025-07-03'),
			{
				EN: 'City park renovation complete',
				NL: 'Stadspark renovatie voltooid',
				CN: '城市公园翻新完成'
			},
			{
				EN: 'The renovation of the central city park has been completed after six months.',
				NL: 'De renovatie van het centrale stadspark is voltooid na zes maanden.',
				CN: '市中心公园的翻新工程已完成，历时六个月。'
			},
			['https://localnews.com/park-renovation'],
			['https://placehold.co/600x400'],
			false
		)
	];
</script>

<Hero />
<section class="screen-tuck flex-col">
	{#if highlightEvent}
		<h2 class="subtitle text-large text-alt">Featured Event</h2>
		<PostEvent post={highlightEvent} />
	{/if}
</section>
<section class="screen-tuck flex-col">
	{#if highlightNews.length}
		<h2 class="subtitle text-large text-alt">Latest News</h2>
		{#each highlightNews as post (post.id)}
			<PostNews {post} />
		{/each}
	{/if}
</section>
