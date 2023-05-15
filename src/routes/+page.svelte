<script lang="ts">
	import { load } from './+page';
	import { Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { Entry } from '../lib/types';
	import { _pb, _saveEntry, _deleteEntry, _formatDate, _showTag } from './+page';
	import { Toast, toastStore, InputChip, LightSwitch } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	let user: any;
	let entries: Entry[] = [];
	let entryText: string;
	let entryTags: string[];
	let toast: ToastSettings;
	let selectedTag: string | null = null;
	$: isTagSelected = (tag: string) => tag === selectedTag;

	const auth = async function auth() {
		const authData = await _pb
			.collection('users')
			.authWithPassword('test@gmail.com', 'passtheword')
			.catch((err) => {
				console.log(err);
			});

		return authData; // Return the authData
	};

	async function fetchEntries() {
		const response = await load();
		if (response.status === 200) {
			entries = response.body.entries;
		}
	}

	onMount(async () => {
		user = await auth();
		await fetchEntries();
	});

	const handleTagClick = async function handleTagClick(tag: string) {
		if (tag === selectedTag) {
			// The clicked tag is the same as the currently selected tag.
			// Clear the filter and fetch all entries again.
			selectedTag = null;
			await fetchEntries();
		} else {
			// The clicked tag is different from the currently selected tag.
			// Fetch entries for the clicked tag and update the selected tag.
			const response = await _showTag([tag]);
			if (response.status == 'NOT OK') {
				toast = {
					message: 'There was an error displaying the tag, please try again',
					timeout: 1000,
					background: 'variant-filled-error'
				};
				toastStore.trigger(toast);
			} else {
				entries = response.body as Entry[];
				selectedTag = tag;
			}
		}
	};

	const handleSave = async function handleSave(text: string, tags: string[]) {
		const response = await _saveEntry(user.record.id, text, tags);
		if (response == 'NOT OK') {
			toast = {
				message: 'There was an error saving your entry, please try again',
				timeout: 1000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(toast);
		} else {
			toast = {
				message: 'Entry saved',
				timeout: 1000,
				background: 'variant-filled-success'
			};
			toastStore.trigger(toast);
		}
		await fetchEntries();
		entryText = '';
		entryTags = [];
	};

	const handleDelete = async function handleDelete(entryId: string) {
		const response = await _deleteEntry(entryId);

		if (response == 'NOT OK') {
			toast = {
				message: 'There was an error deleting your entry, please try again',
				timeout: 1000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(toast);
		} else {
			toast = {
				message: 'Entry deleted',
				timeout: 1000,
				background: 'variant-filled-success'
			};
			toastStore.trigger(toast);
		}

		await fetchEntries();
	};
</script>

<div>
	<div class="flex justify-between m-4">
		<h1 class="">Hi, {user?.record?.first_name}</h1>
		<div class="ml-auto">
			<LightSwitch bgDark="bg-primary-500" rounded="rounded-full" />
		</div>
	</div>

	<div
		class="ring-1 ring-surface-800 dark:ring-tertiary-900 dark:bg-surface-500 p-8 m-4 rounded-sm shadow-lg"
	>
		<h1 class="text-3xl">What's on your mind?</h1>
		<textarea
			bind:value={entryText}
			class="text-black rounded-md w-full"
			placeholder="type here..."
		/>
		<div class="md:flex items-center">
			<InputChip
				class="variant-filled-tertiary mr-2"
				bind:value={entryTags}
				name="tags"
				placeholder="tag your entry"
			/>
			<p class="text-xs mt-2">After typing each tag, press Enter.</p>
		</div>

		<button
			on:click={() => handleSave(entryText, entryTags)}
			type="button"
			class="mt-2 btn variant-filled-primary shadow-md ring-secondary-100"
		>
			Save
		</button>
	</div>

	<div>
		{#each entries as entry}
			<div
				class="dark:bg-surface-500 p-8 m-4 ring-1 ring-surface-800 dark:ring-tertiary-900 rounded-sm shadow-lg md:flex"
			>
				<div class="m-2 flex-grow text-xl">
					<!-- New flex container -->
					<div class="flex flex-col">
						<p>{entry.entry_text}</p>
						{#if Array.isArray(entry.entry_tags)}
							<div>
								{#each entry.entry_tags as tag}
									<button
										on:click={() => handleTagClick(tag)}
										on:keypress={() => handleTagClick(tag)}
										class="inline-flex items-center px-2.5 py-0.5 rounded-full m-0.5 text-xs font-medium bg-primary-100 text-primary-800
										{isTagSelected(tag) ? 'ring-primary-800 ring-2 ' : ''}"
									>
										#{tag}
									</button>
								{/each}
							</div>
						{/if}
						<div>
							<time class="text-xs text-primary-800">
								{_formatDate(new Date(entry.created))}
							</time>
						</div>
					</div>
				</div>
				<div>
					<button
						on:click={() => handleDelete(entry.id)}
						class="mt-2 btn variant-filled-primary shadow-md"
					>
						<Trash2 class="inline-block mr-2" />
						<span>Delete</span>
					</button>
				</div>
			</div>
		{/each}
	</div>

	<Toast position={'br'} max={2} buttonDismiss={'hidden'} />
</div>

<style>
</style>
