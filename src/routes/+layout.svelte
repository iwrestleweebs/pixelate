<script lang="ts">
	import { browser } from '$app/environment';
	import Steps from '$lib/components/layout/steps.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="sans bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white">
	{#if browser}
		<Steps />
		<div class="h-[calc(100vh-112px)]">
			{@render children()}
		</div>
	{/if}
</div>
