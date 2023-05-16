<script lang="ts">
	import { _pb, _auth } from '../routes/+page';
	import { onMount } from 'svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	let email = '';
	let password = '';
	let authError = '';
	let isSubmitting = false;

	const handleSubmit = async () => {
		isSubmitting = true;

		try {
			await _auth(email, password);
		} catch (error) {
			authError = error as string;
		}

		isSubmitting = false;
	};

	onMount(() => {
		email = '';
		password = '';
		authError = '';
	});
</script>

<div class="m-6">
	<div class="flex mb-6 justify-between">
		<h1 class="h1 mb-2">Sign in</h1>
		<LightSwitch class="self-center" bgDark="bg-primary-500" rounded="rounded-full" />
	</div>
	<label for="email">
		Email
		<input
			class="input mb-2 rounded-md shadow-md !bg-gray-100 p-2 text-black"
			bind:value={email}
			type="email"
			name="email"
			placeholder="Email"
			required
			disabled={isSubmitting}
		/>
	</label>
	<label for="password">
		Password
		<input
			class="input mb-2 rounded-md shadow-md !bg-gray-100 p-2 text-black"
			bind:value={password}
			type="password"
			name="password"
			placeholder="Password"
			required
			disabled={isSubmitting}
		/>
	</label>
	<button
		on:click={handleSubmit}
		class="btn variant-filled-primary p-2 rounded-md shadow-md mt-4"
		disabled={isSubmitting}
	>
		{#if isSubmitting}
			<span>Signing in...</span>
		{:else}
			<span>Sign in</span>
		{/if}
	</button>
	{#if authError}
		<p class="rounded-md shadow-md bg-error-700 p-6 m-4">{authError}</p>
	{/if}
</div>
