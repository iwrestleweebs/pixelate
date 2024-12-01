<script lang="ts">
	import Button from './button.svelte';

	type Props = {
		color: string;
		onDelete: () => void;
		onEdit: (color: string) => void;
	};

	let { color, onDelete, onEdit }: Props = $props();
	let colorInput: HTMLInputElement | null = $state(null);
</script>

<div class="flex items-stretch gap-4">
	<button
		onclick={() => colorInput?.click()}
		class="h-20 w-20"
		style:background-color={color}
		aria-label="Color Picker"
	>
		<input
			bind:this={colorInput}
			type="color"
			value={color}
			onchange={(e) => onEdit(e.currentTarget.value)}
			class="invisible h-full w-full"
		/>
	</button>
	<Button variant="outlined" onclick={onDelete} class="w-20">-</Button>
</div>

<style>
	::-moz-color-swatch {
		border-color: red;
	}
</style>
