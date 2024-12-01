<script lang="ts">
	import { browser } from '$app/environment';
	import Steps from '$lib/components/layout/steps.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<meta
		name="description"
		content="Create pixel art by uploading your image. Create and apply your palette. All done locally on your browser."
	/>
</svelte:head>
<div class="sans bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white">
	{#if browser}
		<Steps />
		<div class="h-[calc(100vh-112px)]">
			{@render children()}
		</div>
	{/if}
</div>
