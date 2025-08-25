<script lang="ts">
	import { langData } from '$lib/stores';
</script>

<section class="screen-tuck flex-natural flex-gap-small">
	<div>
		<h1 class="subtitle text-large">{$langData['00_shared-header-nav-contact']}</h1>
		<!-- Main header -->
		<h2 class="header text-medium">
			{$langData['00_shared_contact-main-header-1']}
		</h2>

		<!-- Main description -->
		<p>
			{$langData['00_shared_contact-main-desc-1']}
		</p>

		<!-- Secondary description -->
		<p>
			{$langData['00_shared_contact-main-desc-2']}
		</p>

		<!-- List of services -->
		<ul>
			<li class="text-standard">{$langData['00_shared_contact-main-li-1']}</li>
			<li class="text-standard">{$langData['00_shared_contact-main-li-2']}</li>
			<li class="text-standard">{$langData['00_shared_contact-main-li-3']}</li>
			<li class="text-standard">{$langData['00_shared_contact-main-li-4']}</li>
		</ul>

		<!-- Final description -->
		<p>
			{$langData['00_shared_contact-main-desc-3']}
		</p>
	</div>

	<div class="flex-gap-large flex-responsive">
		<!-- Contact form -->
		<form class="contact-form flex-item">
			<div>
				<input
					id="name"
					name="name"
					type="text"
					placeholder={$langData['00_shared_contact-form-placeholder-name']}
					required
				/>
			</div>
			<div>
				<input
					id="email"
					name="email"
					type="email"
					placeholder={$langData['00_shared_contact-form-placeholder-email']}
					required
				/>
			</div>
			<div>
				<textarea
					id="message"
					name="message"
					rows="5"
					placeholder={$langData['00_shared_contact-form-placeholder-message']}
					required
				></textarea>
			</div>
			<button type="submit" class="btn-primary">
				{$langData['00_shared_contact-form-button-send']}
			</button>
		</form>
	</div>
</section>
