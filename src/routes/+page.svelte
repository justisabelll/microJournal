<script lang="ts">
	import { load } from './+page';
	import { Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { Entry } from '../lib/types';
	import { _pb, _saveEntry, _deleteEntry, _formatDate } from './+page';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

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

	let user: any;
	let entries: Entry[] = [];
	let text: string;
	let toast: ToastSettings;

	onMount(async () => {
		user = await auth();
		await fetchEntries();
	});

	const handleSave = async function handleSave(entryText: string) {
		const response = await _saveEntry(user.record.id, entryText);
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
		text = '';
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
	<h1 class="mt-4">Hi, {user?.record?.first_name}</h1>
	<div class="bg-primary-400 p-8 m-4 rounded-md shadow-lg">
		<h1 class="text-3xl">What's on your mind?</h1>
		<textarea bind:value={text} class="text-black rounded-md w-full" placeholder="type here..." />
		<button
			on:click={() => handleSave(text)}
			type="button"
			class="mt-2 btn variant-filled-secondary">Save</button
		>
	</div>
	<div>
		{#each entries as entry}
			<div class="bg-primary-400 p-8 m-4 rounded-md shadow-lg md:flex">
				<div class="m-2 flex-grow text-xl">
					<p>{entry.entry_text}</p>
					<time class="text-xs text-red-700">
						{_formatDate(new Date(entry.created))}
					</time>
				</div>
				<div>
					<button on:click={() => handleDelete(entry.id)} class="mt-2 btn variant-filled-secondary">
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
