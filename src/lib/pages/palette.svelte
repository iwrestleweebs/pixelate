<script lang="ts">
	import { goto } from '$app/navigation';
	import { get, set } from '$lib/utils/storage';
	import { rgbToHex, findTheShortestDistance, hexToRgb } from '$lib/utils/color';
	import { useImage } from '$lib/components/runes/useImage.svelte';
	import Resizer from '$lib/components/resizer.svelte';
	import PageLayout from '$lib/components/layout/pageLayout.svelte';
	import Button from '$lib/components/common/button.svelte';
	import ResizeInput from '$lib/components/resizeInput.svelte';
	import Desciption from '$lib/components/desciption.svelte';
	import PaletteEditor from '$lib/components/paletteEditor.svelte';
	import ColorImporter from '$lib/components/colorImporter.svelte';

	let { image, setImage } = $derived(
		useImage({ storageKey: 'pixelated-image', fallback: '/clip' })
	);

	const rm = get('resize-multiplier');
	let resizeMultiplier = $state<number>(rm ? +rm : 4);

	let isEditingPalette = $state(false);

	const paletteStorage = get('palette');
	let palette = $state<string[]>(paletteStorage ? JSON.parse(paletteStorage) : []);

	function process() {
		if (!image) {
			console.error('no image');
			return;
		}

		image.getPixelsArray().forEach((color, index) => {
			const hexCode = rgbToHex(color);
			if (!hexCode) return;

			const bestColor = findTheShortestDistance(palette, hexCode);
			const bestColorArray = hexToRgb(bestColor);
			if (!bestColorArray) return;
			setImage(image!.setPixel(index, bestColorArray));
		});

		const result = image.toDataURL();
		set('colorized-image', result);
		goto('/done');
	}

	function handleApply(newPalette: string[]) {
		palette = newPalette;
		isEditingPalette = false;
	}

	function handlePalette(p: string[]) {
		palette = p;
		set('palette', JSON.stringify(p));
	}
</script>

<PageLayout>
	{#snippet imageSection()}
		{#if image}
			<Resizer {image} {resizeMultiplier} />
		{/if}
	{/snippet}
	{#snippet menu()}
		<div class="flex h-full flex-col justify-between gap-4">
			<div class="flex flex-col gap-4">
				<label class="flex items-center gap-2 text-4xl">
					Resize:
					<ResizeInput bind:resizeMultiplier class="flex-1" />
				</label>
				<div class="mt-4 flex flex-col gap-2">
					<div class="flex gap-4">
						<ColorImporter variant="outlined" onPalette={(p) => handlePalette(p)}
							>Import</ColorImporter
						>
						<Button variant="outlined" onclick={() => (isEditingPalette = true)} class="flex-1"
							>Edit</Button
						>
					</div>
					<div class="flex" title="current palette">
						{#each palette as color}
							<div class="h-[80px] flex-1" style:background-color={color}></div>
						{/each}
					</div>
				</div>
				<Desciption>
					<p>Apply palette! You can import .hex or .png files.</p>
					<p>
						If you don't know what to do, just go <a
							href="https://lospec.com/palette-list"
							target="_blank"
							referrerpolicy="no-referrer"
							class="text-zinc-700 underline hover:text-zinc-900 dark:text-yellow-100 hover:dark:text-yellow-200"
							>here</a
						> and export palettes as .hex and upload it here.
					</p>
				</Desciption>
			</div>
			<Button disabled={!palette.length} onclick={process}>Process</Button>
		</div>
	{/snippet}
</PageLayout>

{#if isEditingPalette}
	<PaletteEditor
		initialPalette={palette}
		onApply={handleApply}
		onCancel={() => (isEditingPalette = false)}
	/>
{/if}
