<script lang="ts">
	import { paletteToHex } from '$lib/utils/color';
	import { download } from '$lib/utils/common';
	import ColorImporter from './colorImporter.svelte';
	import Button from './common/button.svelte';
	import ColorEditor from './common/colorEditor.svelte';

	type Props = {
		initialPalette: string[];
		onApply: (palette: string[]) => void;
		onCancel: () => void;
	};
	let { initialPalette, onApply, onCancel }: Props = $props();
	let palette = $state(initialPalette);

	function handleExport() {
		const hexFile = paletteToHex(palette);
		download('palette.hex', hexFile);
	}
</script>

<div class="fixed inset-0 overflow-y-scroll bg-yellow-50 dark:bg-zinc-800">
	<div class="mx-auto max-w-xl px-4 py-8">
		<h1 class="text-6xl">Palette editor</h1>
		<div class="mt-8 flex flex-col gap-8 md:flex-row">
			<div class="flex flex-col items-center gap-2 md:items-start">
				{#each palette as color, i}
					<ColorEditor
						{color}
						onEdit={(c) => (palette[i] = c)}
						onDelete={() => (palette = palette.filter((_p, index) => index !== i))}
					/>
				{/each}
				<Button
					variant="outlined"
					class="w-20"
					onclick={() => (palette = [...palette, palette.at(-1) || '#000000'])}>+</Button
				>
			</div>
			<div
				class="flex flex-1 flex-col justify-end gap-2 border-t-4 border-dashed border-zinc-500 pt-8 md:border-l-4 md:border-t-0 md:pl-8 md:pt-0"
			>
				<Button variant="outlined" onclick={onCancel}>Cancel</Button>
				<Button variant="outlined" onclick={() => (palette = initialPalette)}>Reset</Button>
				<Button variant="outlined" onclick={handleExport}>Export</Button>
				<ColorImporter variant="outlined" onPalette={(p) => (palette = p)}>Import</ColorImporter>
				<ColorImporter variant="outlined" onPalette={(p) => (palette = [...palette, ...p])}
					>Append</ColorImporter
				>
				<Button onclick={() => onApply([...new Set(palette)])}>Apply</Button>
			</div>
		</div>
	</div>
</div>
