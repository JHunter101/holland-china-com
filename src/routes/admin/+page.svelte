<script lang="ts">
	import { onMount } from 'svelte';
	import type { EventPost, EventLocation } from '$lib/models/event.ts';
	import type { NewsPost } from '$lib/models/news.ts';

	// ---- hardcoded admin hash (sha256("password")) ----
	const ADMIN_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

	let unlocked = false;
	let unlockPassword = '';

	async function sha256Hex(text: string): Promise<string> {
		const enc = new TextEncoder();
		const data = enc.encode(text);
		const digest = await crypto.subtle.digest('SHA-256', data);
		return Array.from(new Uint8Array(digest))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}

	async function handleUnlock() {
		const hash = await sha256Hex(unlockPassword);
		if (hash === ADMIN_HASH) {
			unlocked = true;
			sessionStorage.setItem('adminUnlocked', '1');
			unlockPassword = '';
		} else {
			alert('Incorrect password.');
		}
	}

	function lock() {
		unlocked = false;
		sessionStorage.removeItem('adminUnlocked');
	}

	// ---- Post creation form state ----
	type PostType = 'news' | 'event';
	type Lang = 'en' | 'nl' | 'cn';

	let postType: PostType = 'news';

	// common (multilingual)
	let dateLaunchStr = '';
	let titles: Record<Lang, string> = { en: '', nl: '', cn: '' };
	let contents: Record<Lang, string> = { en: '', nl: '', cn: '' };

	// Links as dynamic list
	let links: string[] = [];

	// Images uploaded from device (persisted as data URLs)
	let images: string[] = [];

	// news
	let isPinned = false;

	// event
	let locationName = '';
	let streetName = '';
	let streetNumber = '';
	let postalCode = '';
	let city = '';
	let country = '';
	let eventStartStr = '';
	let eventEndStr = '';
	let linkSignUp = '';

	let posts: (NewsPost | EventPost)[] = [];

	// which language column is active (gets extra size)
	let activeLang: Lang = 'en';

	function resetForm() {
		dateLaunchStr = '';
		titles = { en: '', nl: '', cn: '' };
		contents = { en: '', nl: '', cn: '' };
		links = [];
		images = [];
		isPinned = false;
		locationName = streetName = streetNumber = postalCode = city = country = '';
		eventStartStr = eventEndStr = '';
		linkSignUp = '';
	}

	function reviveDates(obj: any): any {
		if (Array.isArray(obj)) return obj.map(reviveDates);
		if (obj && typeof obj === 'object') {
			const out: any = {};
			for (const [k, v] of Object.entries(obj)) {
				if (typeof v === 'string' && /\d{4}-\d{2}-\d{2}T/.test(v)) {
					const d = new Date(v);
					out[k] = isNaN(d.getTime()) ? v : d;
				} else {
					out[k] = reviveDates(v);
				}
			}
			return out;
		}
		return obj;
	}

	function savePosts() {
		const replacer = (_k: string, v: any) => (v instanceof Date ? v.toISOString() : v);
		localStorage.setItem('adminPosts', JSON.stringify(posts, replacer, 2));
	}

	function loadPosts() {
		const raw = localStorage.getItem('adminPosts');
		if (!raw) return;
		const arr = reviveDates(JSON.parse(raw));
		posts = arr.map((p: any) => {
			if ('eventStart' in p) {
				const loc = new EventLocation(
					p.location.name,
					p.location.streetName,
					p.location.streetNumber,
					p.location.postalCode,
					p.location.city,
					p.location.country
				);
				const ep = new EventPost(
					p.sources ?? [], // sources removed from UI; keep compatibility with models
					new Date(p.dateLaunch),
					p.titles,
					p.contents,
					p.links ?? [],
					p.images ?? [],
					loc,
					new Date(p.eventStart),
					new Date(p.eventEnd),
					p.linkSignUp
				);
				(ep as any).id = p.id;
				return ep;
			} else {
				const np = new NewsPost(
					p.sources ?? [],
					new Date(p.dateLaunch),
					p.titles,
					p.contents,
					p.links ?? [],
					p.images ?? [],
					p.isPinned ?? false
				);
				(np as any).id = p.id;
				return np;
			}
		});
		const maxId = posts.reduce((m, p: any) => Math.max(m, parseInt(p.id, 10) || 0), 0);
		(Post as any)._setNextId(maxId + 1);
	}

	function removePost(id: string) {
		posts = posts.filter((p) => (p as any).id !== id);
		savePosts();
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

	function readFilesAsDataURLs(files: FileList): Promise<string[]> {
		return Promise.all(
			Array.from(files).map(
				(file) =>
					new Promise<string>((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = () => resolve(String(reader.result));
						reader.onerror = reject;
						reader.readAsDataURL(file);
					})
			)
		);
	}

	async function handleImageUpload(e: Event) {
		const files = (e.target as HTMLInputElement).files;
		if (!files || files.length === 0) return;
		const dataUrls = await readFilesAsDataURLs(files);
		images = [...images, ...dataUrls];
		(e.target as HTMLInputElement).value = '';
	}

	function upsertPost(e: Event) {
		e.preventDefault();

		const dateLaunch = dateLaunchStr ? new Date(dateLaunchStr) : new Date();

		if (postType === 'news') {
			const post = new NewsPost(
				[], // sources removed
				dateLaunch,
				titles,
				contents,
				links,
				images,
				isPinned
			);
			posts = [post, ...posts];
		} else {
			if (!eventStartStr || !eventEndStr) {
				alert('Event start and end are required.');
				return;
			}
			const loc = new EventLocation(
				locationName,
				streetName,
				streetNumber,
				postalCode,
				city,
				country
			);
			const post = new EventPost(
				[], // sources removed
				dateLaunch,
				titles,
				contents,
				links,
				images,
				loc,
				new Date(eventStartStr),
				new Date(eventEndStr),
				linkSignUp
			);
			posts = [post, ...posts];
		}

		savePosts();
		resetForm();
	}

	onMount(() => {
		unlocked = sessionStorage.getItem('adminUnlocked') === '1';
		loadPosts();
	});
</script>

<section class="screen-tuck flex-natural text--justify flex-col">
	<form>
		<h1>Admin — Create Posts</h1>

		{#if !unlocked}
			<div class="card" style="margin-top: 1rem;">
				<h3>Unlock</h3>
				<div class="row">
					<div>
						<label>Password</label>
						<input type="password" bind:value={unlockPassword} placeholder="Enter to unlock" />
					</div>
				</div>
				<div style="margin-top: .75rem; display:flex; gap:.5rem;">
					<button on:click|preventDefault={handleUnlock}>Unlock</button>
				</div>
			</div>
		{:else}
			<div class="card" style="margin-top: 1rem;">
				<div style="display:flex; justify-content: space-between; align-items:center; gap: .75rem;">
					<h3>Create a new post</h3>
					<div style="display:flex; gap:.5rem; align-items:center;">
						<button class="secondary" on:click={lock}>Log Out</button>
					</div>
				</div>

				<form on:submit={upsertPost} style="margin-top: .75rem; display:grid; gap:.75rem;">
					<div class="row">
						<div>
							<label>Post type</label>
							<select bind:value={postType}>
								<option value="news">NewsPost</option>
								<option value="event">EventPost</option>
							</select>
						</div>
						<div>
							<label>Date launch</label>
							<input type="datetime-local" bind:value={dateLaunchStr} />
						</div>
					</div>

					<div>
						<label>Titles & Content</label>
						<div class="langs">
							{#each ['cn', 'en', 'nl'] as Lang[] as lang}
								<div
									class="lang-col {activeLang === lang ? 'activeBox' : ''}"
									on:focusin={() => (activeLang = lang)}
								>
									<div class="lang-field">
										<label class="sub">Title ({lang})</label>
										<input bind:value={titles[lang]} placeholder="Title" />
									</div>
									<div class="lang-field">
										<label class="sub">Content ({lang})</label>
										<textarea
											style="resize: none;"
											bind:value={contents[lang]}
											placeholder="Content"
										></textarea>
									</div>
								</div>
							{/each}
						</div>
					</div>

					{#if postType === 'news'}
						<div>
							<label><input type="checkbox" bind:checked={isPinned} /> Pinned</label>
						</div>
					{/if}

					{#if postType === 'event'}
						<fieldset style="border:none; padding:0; margin-top:.25rem;">
							<legend><strong>Event details</strong></legend>
							<div class="row">
								<div>
									<label>Event start</label>
									<input type="datetime-local" bind:value={eventStartStr} />
								</div>
								<div>
									<label>Event end</label>
									<input type="datetime-local" bind:value={eventEndStr} />
								</div>
							</div>
							<div>
								<label>Signup link</label>
								<input placeholder="https://…" bind:value={linkSignUp} />
							</div>
							<div class="row-3">
								<div>
									<label>Location name</label>
									<input bind:value={locationName} />
								</div>
								<div>
									<label>Street</label>
									<input bind:value={streetName} />
								</div>
								<div>
									<label>No.</label>
									<input bind:value={streetNumber} />
								</div>
							</div>
							<div class="row-3">
								<div>
									<label>Postal code</label>
									<input bind:value={postalCode} />
								</div>
								<div>
									<label>City</label>
									<input bind:value={city} />
								</div>
								<div>
									<label>Country</label>
									<input bind:value={country} />
								</div>
							</div>
						</fieldset>
					{/if}
					<!-- Links: dynamic list -->
					<div>
						<label>Links</label>
						<div style="display:flex; flex-direction:column; gap:.5rem;">
							{#each links as link, i}
								<div class="row" style="gap:.5rem; align-items:center;">
									<div style="flex:1;">
										<input
											placeholder="https://example.com"
											bind:value={links[i]}
											on:input={(e) => updateLink(i, (e.target as HTMLInputElement).value)}
										/>
									</div>
									<button type="button" class="secondary" on:click={() => removeLink(i)}
										>Remove</button
									>
								</div>
							{/each}
							<button type="button" on:click={addLink}>+ Add Link</button>
						</div>
					</div>

					<!-- Images: upload from device -->
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
						<button type="submit">Create post</button>
					</div>
				</form>
			</div>

			<div class="list">
				<h3>Posts ({posts.length})</h3>
				{#if posts.length === 0}
					<p class="muted">No posts yet.</p>
				{:else}
					<div style="display:grid; gap:.5rem;">
						{#each posts as p}
							<div class="list-item">
								<div>
									<div>
										<strong>#{(p as any).id}</strong> — {p instanceof NewsPost
											? 'NewsPost'
											: 'EventPost'}
										{#if p instanceof NewsPost && p.isPinned}<span class="pill">pinned</span>{/if}
										{#if p instanceof EventPost && p.isPassed}<span class="pill">passed</span>{/if}
									</div>
									<div class="muted">Launch: {p.dateLaunch.toISOString()}</div>
									<div>
										{p.titles.en || '(no title en)'}
										<span class="muted">/ {p.titles.nl || '(no title nl)'}</span>
										<span class="muted">/ {p.titles.cn || '(no title cn)'}</span>
									</div>
								</div>
								<div style="display:flex; gap:.5rem;">
									<button class="secondary" on:click={() => removePost((p as any).id)}
										>Delete</button
									>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</form>
</section>

<style>
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
	.lang-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
		transition: flex 0.15s ease;
	}
	.lang-col.activeBox {
		flex: 2;
	}
	.lang-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--surface-2, #fafafa);
		border: 1px solid var(--border, #e6e6e6);
		padding: 0.4rem 0.6rem;
		border-radius: 0.5rem;
	}
	.lang-field .sub {
		font-size: 0.85rem;
		color: var(--muted, #6b7280);
	}
	.lang-field input,
	.lang-field textarea {
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
	.pill {
		display: inline-block;
		margin-left: 0.5rem;
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		background: #eef2ff;
		color: #3730a3;
		font-size: 0.75rem;
	}
	.muted {
		color: var(--muted, #6b7280);
	}
</style>
