<script lang="ts">
	import { langData, loadEN, loadNL, loadCN } from '../stores';
	import { derived } from 'svelte/store';

	const partners = derived(langData, ($langData) => {
		const list = [];
		let i = 1;
		while ($langData[`HCC_05_partners-partner-title-${i}`]) {
			list.push({
				name: $langData[`HCC_05_partners-partner-name-${i}`],
				img: `/img/partners/${$langData[`HCC_05_partners-partner-img-${i}`]}.webp`
			});
			i++;
		}
		return list;
	});
</script>

<footer class="screen-tuck section-alt">
	<section class="section flex-gap-small w100">
		<div class="flex-natural flex-gap w100 flex-col">
			<div class="flex-item flex-start flex-gap-small flex-row">
				<div class="flex-item flex-start flex-col">
					<h2 class="header text-standard">HollandChina Consultings</h2>
					<p>
						<a href={`mailto:info@hollandchina.com`} target="_blank"> info@hollandchina.com </a>
					</p>
					<p>KvK: 12345678</p>
					<p>VAT: NL123456789B01</p>
					<p>
						<a href="https://www.linkedin.com/company/hollandchina" target="_blank" rel="noopener">
							<i class="ri-linkedin-fill text-larger"></i>
						</a>
					</p>
				</div>

				<!-- Network -->
				<div class="flex-item flex-end flex-col">
					<h2 class="header text-standard">{$langData['00_shared-footer-header-our_network']}</h2>
					<p><a href="https://www.hollandchina.com">hollandchina.com</a></p>
					<p><a href="https://www.hollandchina.net">hollandchina.net</a></p>
					<p><a href="https://www.europeasianetwork.org">europeasianetwork.org</a></p>
				</div>
			</div>

			<!-- Partners -->
			<div class="flex-item flex-center flex-col">
				<h2 class="header text-standard">
					{$langData['00_shared-footer-header-our_partners']}
				</h2>
				<div id="logo-dump" class="flex-row flex-wrap">
					{#each $partners as partner}
						<img src={partner.img} alt={partner.name} />
					{/each}
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div id="signature" class="flex-responsive-rev flex-center flex-gap-small w100">
			<h2 id="copyright" class="text-small flex-item text-left">
				{$langData['00_shared-footer-header-copyright']}
			</h2>

			<div class="language-select text-small flex-container flex-container-row flex-gap-large">
				<i class="flag-icon flag-icon-nl" on:click={loadNL}></i>
				<i class="flag-icon flag-icon-gb" on:click={loadEN}></i>
				<i class="flag-icon flag-icon-cn" on:click={loadCN}></i>
			</div>

			<h2 id="jack-chen" class="flex-item text-right">
				<a
					class="text-small"
					href="https://www.linkedin.com/in/jack-chen8888"
					target="_blank"
					rel="noopener noreferrer"
				>
					{$langData['00_shared-footer-header-designed_and_developed']}
				</a>
			</h2>
		</div>
	</section>
</footer>

<style>
	#logo-dump {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-evenly;
		align-items: center;
	}

	#logo-dump img {
		max-height: 5vh;
		max-width: 10vh;
		object-fit: contain;
		padding: min(1vh, 0.025rem);
	}
</style>
