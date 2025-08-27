<script lang="ts">
	import { onMount } from 'svelte';
	import type { Locale, PostMeta } from '$lib/models/commonTypes';
	import { NewsPost } from '$lib/models/news';
	import { EventPost, EventLocation } from '$lib/models/event';
	import { loadIndex, loadNewsPost, loadEventPost } from '$lib/services/loadPosts';

	const ADMIN_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

	type State = 'locked' | 'main-menu' | 'editor' | 'posts';
	let state: State = 'locked';
	let unlockPassword = '';

	function goBack() {
		switch (state) {
			case 'editor':
				state = id ? (postType === 'news' ? 'posts' : 'posts') : 'main-menu';
				break;
			case 'posts':
				state = 'main-menu';
				break;
			case 'main-menu':
				lock();
				break;
			default:
				state = 'main-menu';
		}
	}

	function setState(newState: State, reset = false) {
		if (sessionStorage.getItem('adminUnlocked') !== '1') return lock();
		state = newState;
		loadPostsForState();
	}

	async function sha256Hex(text: string): Promise<string> {
		const data = new TextEncoder().encode(text);
		const hash = await crypto.subtle.digest('SHA-256', data);
		return Array.from(new Uint8Array(hash))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}

	async function handleUnlock() {
		if ((await sha256Hex(unlockPassword)) === ADMIN_HASH) {
			sessionStorage.setItem('adminUnlocked', '1');
			setState('main-menu');
			unlockPassword = '';
		} else {
			alert('Incorrect password.');
		}
	}

	function lock() {
		state = 'locked';
		sessionStorage.removeItem('adminUnlocked');
	}

	type PostType = 'news' | 'event';
	let postType: PostType = 'news';

	// Form fields
	let id = '';
	let dateLaunchStr = '';
	let titles: Record<Locale, string> = { EN: '', NL: '', CN: '' };
	let contents: Record<Locale, string> = { EN: '', NL: '', CN: '' };
	let links: string[] = [];
	let images: string[] = [];
	let activeLang: Locale = 'EN';
	let isPinned = false;
	let locationName = '';
	let streetName = '';
	let streetNumber = '';
	let postalCode = '';
	let city = '';
	let country = '';
	let eventStartStr = '';
	let eventEndStr = '';
	let linkSignUp = '';
	let posts: PostMeta[] = [];

	function resetForm() {
		id = '';
		dateLaunchStr = '';
		titles = { EN: '', NL: '', CN: '' };
		contents = { EN: '', NL: '', CN: '' };
		links = [];
		images = [];
		isPinned = false;
		locationName = streetName = streetNumber = postalCode = city = country = '';
		eventStartStr = eventEndStr = '';
		linkSignUp = '';
	}

	function addLink() {
		links = [...links, ''];
	}
	function updateLink(i: number, v: string) {
		links[i] = v;
	}
	function removeLink(i: number) {
		links = links.filter((_, idx) => idx !== i);
	}
	function removeImage(i: number) {
		images = images.filter((_, idx) => idx !== i);
	}

	async function handleImageUpload(e: Event) {
		const files = (e.target as HTMLInputElement).files;
		if (!files) return;
		const dataUrls = await Promise.all(
			Array.from(files).map(
				(f) =>
					new Promise<string>((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = () => resolve(reader.result as string);
						reader.onerror = reject;
						reader.readAsDataURL(f);
					})
			)
		);
		images = [...images, ...dataUrls];
		(e.target as HTMLInputElement).value = '';
	}

	async function savePost() {
		try {
			const postPayload =
				postType === 'news'
					? new NewsPost([], new Date(dateLaunchStr), titles, contents, links, images, isPinned)
					: new EventPost(
							[],
							new Date(dateLaunchStr),
							titles,
							contents,
							links,
							images,
							new EventLocation(locationName, streetName, streetNumber, postalCode, city, country),
							new Date(eventStartStr),
							new Date(eventEndStr),
							linkSignUp
						);

			if (id) (postPayload as any).id = id;

			const saveId = id || crypto.randomUUID();
			await fetch(`/posts/${postType}s/${saveId}.json`, {
				method: 'PUT',
				body: JSON.stringify(postPayload),
				headers: { 'Content-Type': 'application/json' }
			});

			alert('Post saved!');
			resetForm();
			setState('posts');
		} catch (err) {
			console.error(err);
			alert('Failed to save post.');
		}
	}

	async function loadPostsForState() {
		if (postType === 'news') posts = await loadIndex('news');
		else if (postType === 'event') posts = await loadIndex('events');
	}

	async function editPost(meta: PostMeta) {
		const loaded = postType === 'news' ? await loadNewsPost(meta) : await loadEventPost(meta);
		if (!loaded) return alert('Failed to load post.');
		id = meta.id;
		dateLaunchStr = new Date(loaded.dateLaunch).toISOString().slice(0, 16);
		titles = loaded.titles;
		contents = loaded.contents;
		links = loaded.links;
		images = loaded.images;

		if (postType === 'news') isPinned = (loaded as NewsPost).isPinned;
		else {
			const ev = loaded as EventPost;
			locationName = ev.location.name;
			streetName = ev.location.streetName;
			streetNumber = ev.location.streetNumber;
			postalCode = ev.location.postalCode;
			city = ev.location.city;
			country = ev.location.country;
			eventStartStr = new Date(ev.eventStart).toISOString().slice(0, 16);
			eventEndStr = new Date(ev.eventEnd).toISOString().slice(0, 16);
			linkSignUp = ev.linkSignUp;
		}

		setState('editor');
	}

	async function deletePost(meta: PostMeta) {
		if (!confirm('Are you sure you want to delete this post?')) return;
		await fetch(`/posts/${postType}s/${meta.id}.json`, { method: 'DELETE' });
		alert('Post deleted');
		loadPostsForState();
	}

	onMount(() => {
		if (sessionStorage.getItem('adminUnlocked') !== '1') state = 'locked';
	});
</script>

<section class="screen-tuck flex-natural flex-gap-small flex-col text-justify">
	<h1>Admin — Create Posts</h1>

	{#if state === 'locked'}
		<div class="card">
			<input type="password" bind:value={unlockPassword} placeholder="Enter password to unlock" />
			<div style="margin-top: .75rem;">
				<button on:click|preventDefault={handleUnlock}>Unlock</button>
			</div>
		</div>
	{:else}
		<div style="display:flex; gap:.5rem; margin-bottom:.5rem;">
			<button class="secondary" on:click={goBack}>Back</button>
			<button class="secondary" on:click={lock}>Log Out</button>
		</div>
	{/if}

	{#if state === 'main-menu'}
		<div class="card flex-gap-small flex-col">
			<button on:click={() => setState('editor', true)}>Create new post</button>
			<button
				on:click={() => {
					postType = 'news';
					setState('posts');
				}}>Edit news</button
			>
			<button
				on:click={() => {
					postType = 'event';
					setState('posts');
				}}>Edit event</button
			>
		</div>
	{:else if state === 'posts'}
		<div class="card">
			<h3>{postType === 'news' ? 'News Posts' : 'Event Posts'}</h3>
			<table class="post-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Launch Date</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{#each posts as post}
						<tr>
							<td>{post.id}</td>
							<td>{post.title}</td>
							<td>{post.launchDate}</td>
							<td>
								<button on:click={() => editPost(post)}>Edit</button>
							</td>
							<td>
								<button on:click={() => deletePost(post)}>Delete</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else if state === 'editor'}
		<div class="card">
			<div class="row" style="justify-content:space-between; align-items:center;">
				<h3>{id ? 'Edit Post' : 'Create a new post'}</h3>
			</div>
			<form
				on:submit|preventDefault={savePost}
				style="margin-top: .75rem; display:grid; gap:.75rem;"
			>
				<label>ID:</label> <input bind:value={id} disabled />
				<!-- Post type & launch date -->
				<div class="row">
					<div>
						<label>Post type</label>
						<select bind:value={postType}>
							<option value="news">NewsPost</option> <option value="event">EventPost</option>
						</select>
					</div>
					<div>
						<label>Date launch</label> <input type="datetime-local" bind:value={dateLaunchStr} />
					</div>
				</div>
				<!-- Titles & Content -->
				<div>
					<label>Titles & Content</label>
					<div class="langs">
						{#each ['CN', 'EN', 'NL'] as locale: Locale}
							<div
								class="locale-col {activeLang === locale ? 'activeBox' : ''}"
								on:focusin={() => (activeLang = locale)}
							>
								<div class="locale-field">
									<label class="sub">Title ({locale})</label>
									<input bind:value={titles[locale]} placeholder="Title" />
								</div>
								<div class="locale-field">
									<label class="sub">Content ({locale})</label>
									<textarea bind:value={contents[locale]} placeholder="Content" style="resize:none;"
									></textarea>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<!-- News / Event Specific -->
				{#if postType === 'news'}
					<div><label><input type="checkbox" bind:checked={isPinned} /> Pinned</label></div>
				{/if}
				{#if postType === 'event'}
					<fieldset style="border:none; padding:0; margin-top:.25rem;">
						<legend><strong>Event details</strong></legend>
						<div class="row">
							<div>
								<label>Event start</label><input type="datetime-local" bind:value={eventStartStr} />
							</div>
							<div>
								<label>Event end</label><input type="datetime-local" bind:value={eventEndStr} />
							</div>
						</div>
						<div>
							<label>Signup link</label><input placeholder="https://…" bind:value={linkSignUp} />
						</div>
						<div class="row-3">
							<div><label>Location name</label><input bind:value={locationName} /></div>
							<div><label>Street</label><input bind:value={streetName} /></div>
							<div><label>No.</label><input bind:value={streetNumber} /></div>
						</div>
						<div class="row-3">
							<div><label>Postal code</label><input bind:value={postalCode} /></div>
							<div><label>City</label><input bind:value={city} /></div>
							<div><label>Country</label><input bind:value={country} /></div>
						</div>
					</fieldset>
				{/if}
				<!-- Links -->
				<div>
					<label>Links</label>
					<div style="display:flex; flex-direction:column; gap:.5rem;">
						{#each links as link, i}
							<div class="row" style="gap:.5rem; align-items:center;">
								<input
									placeholder="https://example.com"
									bind:value={links[i]}
									on:input={(e) => updateLink(i, (e.target as HTMLInputElement).value)}
								/>
								<button type="button" class="secondary" on:click={() => removeLink(i)}
									>Remove</button
								>
							</div>
						{/each} <button type="button" on:click={addLink}>+ Add Link</button>
					</div>
				</div>
				<!-- Images -->
				<div>
					<label>Images</label>
					<input type="file" multiple accept="image/*" on:change={handleImageUpload} />
					{#if images.length}
						<div class="thumbs">
							{#each images as img, i}
								<div class="thumb">
									<img src={img} alt="preview" />
									<button type="button" class="secondary small" on:click={() => removeImage(i)}
										>Remove</button
									>
								</div>
							{/each}
						</div>
					{/if}
				</div>
				<div style="display:flex; gap:.5rem;">
					<button type="button" class="secondary" on:click={resetForm}>Reset</button>
					<button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
				</div>
			</form>
		</div>
	{/if}
</section>

<style>
	.post-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}
	.post-table th,
	.post-table td {
		border: 1px solid var(--border, #e6e6e6);
		padding: 0.5rem;
		text-align: left;
	}
	.post-table th {
		background: var(--surface-2, #fafafa);
	}
	tr:nth-child(even) {
		background: #f9f9f9;
	}

	.thumbs {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}
	.thumb {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}
	.thumb img {
		width: 96px;
		height: 96px;
		object-fit: cover;
		border-radius: 0.5rem;
		border: 1px solid var(--border, #e6e6e6);
	}

	.small {
		padding: 0.15rem 0.4rem;
		font-size: 0.8rem;
	}

	.langs {
		display: flex;
		gap: 0.75rem;
		align-items: stretch;
	}
	.locale-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
		transition: flex 0.15s ease;
	}
	.locale-col.activeBox {
		flex: 2;
	}
	.locale-field .sub {
		font-size: 0.85rem;
		color: var(--muted, #6b7280);
	}
	.locale-field input,
	.locale-field textarea {
		width: 100%;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}
	.row-3 {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
	}
</style>
