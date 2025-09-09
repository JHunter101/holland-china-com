<script lang="ts">
	import { langData, loadEN, loadNL, loadCN } from '../stores';
	import { derived } from 'svelte/store';

	const partners = derived(langData, ($langData) => {
		const list = [];
		let i = 1;
		while ($langData[`HCC_05_partners-partner-title-${i}`]) {
			list.push({
				name: $langData[`HCC_05_partners-partner-title-${i}`],
				img: $langData[`HCC_05_partners-partner-img-${i}`]
					? `/img/partners/${$langData[`HCC_05_partners-partner-img-${i}`]}.webp`
					: 'https://placehold.co/400x200'
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100"
								height="30"
								viewBox="0 0 291 79.46"
							>
								<g transform="translate(-200.552,-393.962)">
									<g transform="matrix(1.018827,0,0,-1.018827,170.6,498.033)">
										<path
											d="m239.33 95.036c0 2.96 2.46 5.361 5.496 5.361h63.376c3.035 0 5.496-2.401 5.496-5.361V30.919c0-2.961-2.461-5.361-5.496-5.361h-63.376c-3.036 0-5.496 2.4-5.496 5.361z"
											fill="#006699"
										/>
										<path d="M31.152 37.709h31.036v10.189H42.384v38.874H31.152z" fill="#000" />
										<path
											d="M77.9 37.709v33.793H66.668V37.709zM72.284 76.116c3.917 0 6.355 2.595 6.355 5.84-.073 3.315-2.438 5.837-6.28 5.837-3.843 0-6.355-2.522-6.355-5.837 0-3.245 2.438-5.84 6.207-5.84z"
											fill="#000"
										/>
										<path
											d="M83.115 37.709h11.233v18.872c0 1.01.073 2.019.37 2.741.812 2.017 2.66 4.107 5.763 4.107 4.065 0 5.691-3.1 5.691-7.64v-18.08h11.231v19.377c0 10.38-5.542 15.21-12.932 15.21-6.059 0-8.72-3.387-10.198-5.694v4.9H83.115z"
											fill="#000"
										/>
										<path
											d="M133.249 86.772h-11.233v-49.063h11.233v10.956l2.807 3.534 8.794-14.49h13.818l-14.778 20.977 12.932 14.272h-13.523l-10.05-14.283z"
											fill="#000"
										/>
										<path
											d="M188.706 51.805c.148.868.37 2.533.37 4.415 0 8.736-4.435 17.604-16.11 17.604-12.489 0-18.252-9.877-18.252-18.835 0-11.08 7.02-18 19.287-18 4.878 0 9.384.72 13.08 2.234l-1.479 7.418c-3.029-1.005-6.133-1.507-9.975-1.507-5.247 0-9.828 2.153-10.198 6.743h23.277zm-23.35 7.599c.295 2.884 2.217 7.138 7.02 7.138 5.098 0 6.281-4.543 6.281-7.138z"
											fill="#000"
										/>
										<path
											d="M216.801 86.772V69.788c-1.626 2.377-5.026 3.963-9.532 3.963-8.647 0-16.257-6.92-16.184-18.741 0-10.958 6.873-18.094 15.444-18.094 4.655 0 9.089 2.019 11.306 5.912l.222-5.119h9.977c-.148 2.379-.297 6.488-.297 10.524v38.539zm0-33.421c0-.864-.074-1.73-.222-2.45-.664-3.1-3.325-5.262-6.576-5.262-4.656 0-7.686 3.748-7.686 9.659 0 5.55 2.587 10.019 7.759 10.019 3.473 0 5.912-2.378 6.577-5.333z"
											fill="#000"
										/>
										<path
											d="M261.873 37.749v33.794H250.64V37.749zM256.257 76.157c3.917 0 6.355 2.595 6.355 5.838-.073 3.316-2.438 5.839-6.281 5.839-3.842 0-6.354-2.523-6.354-5.839 0-3.243 2.438-5.838 6.207-5.838z"
											fill="#fff"
										/>
										<path
											d="M268.088 37.749h11.232v18.872c0 1.01.073 2.019.37 2.741.812 2.018 2.66 4.108 5.763 4.108 4.065 0 5.691-3.099 5.691-7.642V37.749h11.231v19.377c0 10.38-5.542 15.21-12.932 15.21-6.06 0-8.72-3.387-10.198-5.694v4.901h-11.232z"
											fill="#fff"
										/>
									</g>
								</g>
							</svg>
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
		<div id="signature" class="flex-center flex-gap-small w100 flex-col">
			<div class="language-select text-small flex-gap flex-row">
				<i class="flag-icon flag-icon-nl" on:click={loadNL}></i>
				<i class="flag-icon flag-icon-gb" on:click={loadEN}></i>
				<i class="flag-icon flag-icon-cn" on:click={loadCN}></i>
			</div>
			<h2 id="copyright" class="text-small flex-item text-left">
				{$langData['00_shared-footer-header-copyright']}
			</h2>

			<h2 id="jack-chen" class="w100 text-right">
				<a
					class="text-tiny"
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
