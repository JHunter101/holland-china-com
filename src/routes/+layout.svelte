<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { langData, loadNL } from '$lib/stores';
	import { derived } from 'svelte/store';

	// Load NL on mount
	onMount(() => {
		loadNL();
	});

	// Dynamically collect principles from JSON keys
	const principles = derived(langData, ($langData) =>
		['Precision', 'Direct', 'Loyalty', 'Philosophy', 'Professionalism'].map((key) => ({
			title: $langData[`about-principles-${key}-title`] || key,
			points: Object.values($langData[`about-principles-${key}-points`] || {})
		}))
	);
</script>

<svelte:head>
	<title>Holland China</title>
	<link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"
	/>
	<link rel="stylesheet" href="/css/core.css" />
	<link rel="stylesheet" href="/css/nav.css" />
	<link rel="stylesheet" href="/css/colors.css" />
	<link rel="stylesheet" href="/css/common.css" />
	<link rel="stylesheet" href="/css/frames.css" />
	<link rel="stylesheet" href="/css/text.css" />
	<link rel="stylesheet" href="/css/clickables.css" />
	<link rel="stylesheet" href="/css/form.css" />
	<link rel="stylesheet" href="/css/here.css" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />
