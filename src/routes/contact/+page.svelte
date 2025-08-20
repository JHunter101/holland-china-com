<script lang="ts">
	import { langData } from '$lib/stores';
</script>

<section class="screen-tuck flex-natural section text--justify">
	<h1 class="subtitle text-large">{$langData['contact-main-title'] || 'Contact Us'}</h1>
	<div class="flex-gap-large flex-responsive">
		<div class="flex-item">
			<h2 class="header text-medium">
				{$langData['contact-form-title'] ||
					'Welcome to China-Netherlands Consulting. Contact us to learn more about our high-end cross-border consulting services!'}
			</h2>
			<p>
				{$langData['contact-main-text'] ||
					'We are here to answer your questions and discuss how we can collaborate. Reach out to us through the form below or via our contact details.'}
			</p>
		</div>
		<form class="contact-form flex-item">
			<div>
				<input id="name" name="name" type="text" placeholder="Your Name" required />
			</div>
			<div>
				<input id="email" name="email" type="email" placeholder="Your Email" required />
			</div>
			<div>
				<textarea id="message" name="message" rows="5" placeholder="Type your message..." required
				></textarea>
			</div>
			<button type="submit" class="btn-primary">
				{$langData['contact-form-submit'] || 'Send Message'}
			</button>
		</form>
	</div>
</section>

<style>
</style>
