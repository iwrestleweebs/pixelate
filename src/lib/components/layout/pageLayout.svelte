<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		imageSection,
		menu
	}: {
		imageSection: Snippet;
		menu: Snippet;
	} = $props();
</script>

<div class="flex h-auto flex-col md:h-full md:flex-row">
	<div
		class="griddy flex flex-1 basis-[70vh] items-center justify-center bg-yellow-50 md:basis-auto dark:bg-zinc-800"
	>
		{@render imageSection()}
	</div>
	<div
		class="basis-[400px] border-t-4 border-dashed border-zinc-700 p-8 md:border-l-4 md:border-t-0"
	>
		{@render menu()}
	</div>
</div>
