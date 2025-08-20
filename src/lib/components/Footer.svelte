<script lang="ts">
	import { langData, loadEN, loadNL, loadCN } from '../stores';
</script>

<footer class="screen-tuck section-alt">
	<section class="section flex-gap-small w100">
		<div class="flex-responsive flex-natural flex-gap w100">
			<!-- Left column: Company Info -->
			<div class="flex-item flex-start flex-gap-small flex-row">
				<div class="flex-item flex-start flex-col">
					<h2 class="header text-standard">{$langData['footer-companyName']}</h2>
					<p>
						<a href={`mailto:${$langData['footer-email']}`} target="_blank">
							{$langData['footer-email']}
						</a>
					</p>
					<p>{$langData['footer-kvk']}</p>
					<p>{$langData['footer-vat']}</p>
					<p>
						<a href="https://www.linkedin.com/company/hollandchina" target="_blank" rel="noopener">
							<i class="ri-linkedin-fill text-larger"></i>
						</a>
					</p>
				</div>

				<!-- Network -->
				<div class="flex-item flex-start flex-col">
					<h2 class="header">{$langData['footer-network']}</h2>
					<p><a href="https://www.hollandchina.com">hollandchina.com</a></p>
					<p><a href="https://www.hollandchina.net">hollandchina.net</a></p>
					<p><a href="https://www.europeasianetwork.org">europeasianetwork.org</a></p>
				</div>
			</div>

			<!-- Partners -->
			<div class="flex-item flex-natural flex-col">
				<h2 class="header text-center">{$langData['footer-partners']}</h2>
				<div id="logo-dump" class="flex-row flex-wrap">
					<img src="res/partners/1689250661171.jpeg" alt="partner 1" />
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div id="signature" class="flex-responsive-rev flex-center flex-gap-small w100">
			<h2 id="copyright" class="text-small flex-item text-left">
				{$langData['footer-copyright']}
			</h2>

			<div class="language-select text-small flex-container flex-container-row flex-gap-large">
				<i class="flag-icon flag-icon-nl" on:click={loadNL}></i>
				<i class="flag-icon flag-icon-gb" on:click={loadEN}></i>
				<i class="flag-icon flag-icon-cn" on:click={loadCN}></i>
			</div>

			<h2 id="jack-chen" class="text-small flex-item text-right">
				<a
					href="https://www.linkedin.com/in/jack-chen8888"
					target="_blank"
					rel="noopener noreferrer"
				>
					{$langData['footer-designedBy']}
				</a>
			</h2>
		</div>
	</section>
</footer>
