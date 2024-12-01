<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="relative flex w-full flex-col gap-2 border-2 border-dashed border-zinc-500 bg-yellow-50 p-8 text-center text-2xl text-zinc-500 dark:bg-zinc-900 dark:text-yellow-50"
>
	{@render children()}
	<div
		class="absolute right-2 top-2 h-8 w-8 border-r-2 border-t-2 border-dashed border-zinc-500"
	></div>
	<div
		class="absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 border-dashed border-zinc-500"
	></div>
</div>
