<script lang="ts">
	import { langData } from '$lib/stores';
</script>

<section class="screen-tuck flex-natural section text--justify">
	<h1 class="subtitle text-large">{$langData['00_shared_contact-main-desc-1']}</h1>

	<div class="flex-gap-large flex-responsive">
		<div class="flex-item">
			<h2 class="header text-medium">
				{$langData['00_shared_contact-main-desc-1']}
			</h2>
			<p>
				{$langData['00_shared_contact-main-desc-1']}
			</p>
		</div>

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

<style>
	/* Optional: Add spacing and responsive styling if needed */
</style>
