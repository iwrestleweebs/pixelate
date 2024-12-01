<script lang="ts">
	import { get, set } from '$lib/utils/storage';
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';

	const rm = get('resize-multiplier');

	type Props = SvelteHTMLElements['select'] & { resizeMultiplier: number };
	let { resizeMultiplier = $bindable(rm ? +rm : 4), ...rest }: Props = $props();

	const options = new Array(16).fill(0).map((_, i) => i + 1);

	$effect(() => set('resize-multiplier', resizeMultiplier.toString()));
</script>

<select
	bind:value={resizeMultiplier}
	{...rest}
	class={clsx(
		'dark:active:ring-tellow-50 h-[64px] rounded border-4 border-zinc-700 text-4xl focus:border-zinc-900 focus:ring-4 active:border-zinc-900 active:ring-4  active:ring-zinc-900 dark:bg-zinc-900 dark:focus:ring-yellow-50',
		rest.class
	)}
>
	{#each options as option}
		<option value={option} class="text-2xl">x{option}</option>
	{/each}
</select>
