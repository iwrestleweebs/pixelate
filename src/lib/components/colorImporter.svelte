<script lang="ts">
	import { importColors } from '$lib/utils/color';
	import type { Snippet } from 'svelte';
	import Button, { type ButtonProps } from './common/button.svelte';

	type Props = {
		onPalette: (palette: string[]) => void;
		children: Snippet;
	} & ButtonProps;
	let { onPalette, children, ...rest }: Props = $props();

	let files: FileList | undefined = $state();
	let input: HTMLInputElement | null = $state(null);

	$effect(() => {
		if (!files || !files[0]) return;

		const req = importColors(files);
		if (!req) return;

		req.then(onPalette);
	});

	function handleClick(e: any) {
		input?.click();
		rest.onclick && rest.onclick(e);
	}
</script>

<Button {...rest} onclick={handleClick}>
	{@render children()}
</Button>
<input type="file" accept=".hex, image/png" hidden bind:files bind:this={input} />
