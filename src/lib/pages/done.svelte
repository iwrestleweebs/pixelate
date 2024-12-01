<script lang="ts">
	import Desciption from '$lib/components/desciption.svelte';
	import PageLayout from '$lib/components/layout/pageLayout.svelte';
	import ResizeInput from '$lib/components/resizeInput.svelte';
	import Resizer from '$lib/components/resizer.svelte';
	import { useImage } from '$lib/components/runes/useImage.svelte';
	import { get } from '$lib/utils/storage';

	const rm = get('resize-multiplier');
	let resizeMultiplier = $state<number>(rm ? +rm : 4);

	let { image } = $derived(useImage({ storageKey: 'colorized-image', fallback: '/palette' }));
</script>

<PageLayout>
	{#snippet imageSection()}
		{#if image}
			<Resizer {image} {resizeMultiplier} />
		{/if}
	{/snippet}
	{#snippet menu()}
		<div class="flex flex-col gap-4">
			<label class="flex items-center gap-2 text-4xl">
				Resize:
				<ResizeInput bind:resizeMultiplier class="flex-1" />
			</label>
			<Desciption>
				<p>All done! You can download or copy with right click.</p>
			</Desciption>
		</div>
	{/snippet}
</PageLayout>
