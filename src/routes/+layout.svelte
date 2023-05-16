<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { _pb } from './+page';
	import SignIn from '../components/signIn.svelte';
</script>

<Drawer
	bgDrawer={'bg-surface-100 dark:bg-surface-600'}
	blur={'backdrop-blur-md'}
	height={'h-full'}
	width={'md:w-1/2'}
	rounded={'rounded-md'}
	padding={'p-4'}
	border={'border border-surface-800 dark:border-tertiary-900'}
>
	{#if $drawerStore}
		{#if $drawerStore.id === 'drawer-no-auth'}
			<SignIn />
		{/if}
		<a
			href="/about"
			class="variant-filled-primary p-2
			rounded-none hover:bg-primary-400 w-full
			inline-flex shadow-sm underline text-2xl
			"
		>
			What is this?
		</a>
	{/if}
</Drawer>
<AppShell>
	<svelte:fragment slot="header" />
	<slot />
</AppShell>
