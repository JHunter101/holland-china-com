<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	export let images: string[] = [];
	export let intervalTime = 5000;

	let currentSlide = 0;
	let interval: ReturnType<typeof setInterval>;

	function nextSlide() {
		currentSlide = (currentSlide + 1) % images.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + images.length) % images.length;
	}

	function startCarousel() {
		clearInterval(interval);
		interval = setInterval(() => {
			nextSlide();
		}, intervalTime);
	}

	onMount(() => {
		if (images.length > 1) startCarousel();
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="carousel">
	<div class="slides" style="transform: translateX(-{currentSlide * 100}%);">
		{#each images as img}
			<img src={img} alt="Event image" />
		{/each}
	</div>

	{#if images.length > 1}
		<button class="prev" on:click={prevSlide} aria-label="Previous Slide">&#10094;</button>
		<button class="next" on:click={nextSlide} aria-label="Next Slide">&#10095;</button>

		<div class="dots">
			{#each images as _, i}
				<span class:active={i === currentSlide} on:click={() => (currentSlide = i)}></span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		overflow: hidden;
		border-radius: min(2vh, 0.5rem);
	}

	.slides {
		display: flex;
		transition: transform 0.5s ease-in-out;
	}

	img {
		flex-shrink: 0;
	}

	.prev,
	.next {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		border: none;
		cursor: pointer;
		border-radius: min(2vh, 0.5rem);
		font-size: 1.5rem;
	}

	.prev {
		left: 1rem;
	}

	.next {
		right: 1rem;
	}

	.dots {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.5rem;
	}

	.dots span {
		width: 10px;
		height: 10px;
		background: rgb(var(--color-bg-main));
		border-radius: 50%;
		cursor: pointer;
	}

	.dots span.active {
		background: rgb(var(--color-accent-alt));
	}
</style>
